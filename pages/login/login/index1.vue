<template>
	<view class="jshop-login">
		<view class="jshop-text_center jshop-login-icon">
			<image class="jshop-login-avatar" :src="logoImage"></image>
		</view>
		<view>
			<view class="jshop-login-input">
				<view class="jshop-login-input_item">
					<input placeholder="请输入手机号码" v-model="mobile" @input="validate('mobile')" type="number" maxlength="11" />
					<transition @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter" @leave="handleLeave"
					 @after-leave="handleAfterLeave">
						<view v-if="rules['mobile'].error" class="jshop-error error-message">{{rules['mobile'].message}}</view>
					</transition>
				</view>
				<view class="jshop-login-input_item" v-show="!isCaptcha">
					<input placeholder="请输入密码" v-model="password" type="password" @before-enter="handleBeforeEnter" @enter="handleEnter"
					 @after-enter="handleAfterEnter" @leave="handleLeave" @after-leave="handleAfterLeave" @input="validate('password')" />
					<transition>
						<view v-if="rules['password'].error" class="jshop-error error-message">{{rules['password'].message}}</view>
					</transition>
				</view>
				<view class="jshop-login-input_item" v-show="isCaptcha">
					<input placeholder="请输入验证码" v-model="captcha" @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter"
					 @leave="handleLeave" @after-leave="handleAfterLeave" style="display: inline-block;width: 60%;"/>
					<view class="jshop-login-sendcaptcha" @click="sendCode" v-if="verification">发送验证码</view>
					<view class="jshop-login-sendcaptcha" v-if="!verification">{{ timer }} 秒后重新获取</view>
				</view>
			</view>
			<view>
				<view>
					<button class="jshop-login-button" @click="loginHandler">登录</button>
				</view>
				<view class="jshop-flex jshop-flex-space-between jshop-login-other jshop-center">
					<view @click="isCaptcha = !isCaptcha">{{!isCaptcha ? '验证码登录' : '密码登录'}}</view>
					<view @click="toReg">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'LoginIndex',
		data() {
			return {
				mobile: '',
				password: '',
				isCaptcha: false,
				captchaUrl: '',
				captcha: '',
				timer: 60,
				verification: true,
				rules: {
					mobile: {
						error: false,
						message: ''
					},
					password: {
						error: false,
						message: ''
					}
				}
			}
		},
		computed: {
			logoImage() {
				return this.db.config.shop_logo
			}
		},
		methods: {
			validate(props) {
				let value = String(this[props]).trim();
				this.rules[props].error = false;
				this.rules[props].message = '';
				if (/^\s*$/.test(value)) {
					this.rules[props].error = true;
					this.rules[props].message = '不能为空!';
					return;
				}
				if (value && props === 'mobile') {
					if (!/^[1][3|4|5|7|8]{1}\d{9}$/.test(value)) {
						this.rules[props].error = true;
						this.rules[props].message = '手机号格式不正确!';
						return;
					}
				}
				if (value && props === 'password') {
					if (value.length < 6) {
						this.rules[props].error = true;
						this.rules[props].message = '密码长度不正确!';
						return;
					}
				}
			},
			handleBeforeEnter(el) {
				el.style.display = 'none';
				el.style.opacity = 0.7;
				el.style.webkitTransform = 'translateX(-2000px) scale(0.7)';
				el.style.transform = 'translateX(-2000px) scale(0.7)'
			},
			handleEnter(el) {
				el.style.display = 'block';
				el.style.opacity = 0.7;
				el.style.webkitTransform = 'translateX(0px) scale(0.7)';
				el.style.transform = 'translateX(0px) scale(0.7)';
				el.style.webkitTransition = 'all 0.5s'
			},
			handleAfterEnter(el) {
				el.style.display = 'block';
				el.style.opacity = 1;
				el.style.webkitTransform = 'scale(1)';
				el.style.transform = 'scale(1)';
			},
			handleLeave(el) {
				el.style.display = 'block';
				el.style.opacity = 0.7;
				el.style.webkitTransform = 'translateX(0px) scale(0.7)';
				el.style.transform = 'translateX(0px) scale(0.7)';
				el.style.webkitTransition = 'all 0.5s'
			},
			handleAfterLeave(el) {
				el.style.display = 'none';
				el.style.opacity = 0.7;
				el.style.webkitTransform = 'translateX(-2000px) scale(0.7)';
				el.style.transform = 'translateX(-2000px) scale(0.7)'
			},
			//整体校验
			validateAll() {
				let props;
				if(!this.isCaptcha) {
					props = ['mobile', 'password']
				} else {
					props = ['mobile']
				}
				props.forEach(prop => this.validate(prop));
				return props.some(prop => this.rules[prop].error === true);
			},
			// 登录处理
			loginHandler() {
				this.toLogin()
			},
			// 去登录
			toLogin() {
				let data = {
					mobile: this.mobile,
					password: this.password
				}

				if (this.isCaptcha) {
					data.captcha = this.captcha
				}

				// 获取邀请码
				let invicode = this.$storage.get('invitecode')
				if (invicode) {
					data.invitecode = invicode
				}

				this.$api.login(data, res => {
					if (res.status) {
						this.$storage.set('userToken', res.data)
						this.redirectHandler()
					} else {
						this.$utils.errorToShow(res.msg, () => {
							// 需要输入验证码 或者 验证码错误刷新
							if (res.data === 10013 || res.data === 10012) {
								this.isCaptcha = true
							}

							// 登录需要验证码
							if (this.isCaptcha) {
								this.getCaptchaUrl()
							}
						})
					}
				})
			},
			// 获取验证码图片地址
			getCaptchaUrl() {
				this.captchaUrl = this.$config.apiBaseUrl + 'captcha.html'
			},
			// 重定向跳转 或者返回上一个页面
			redirectHandler() {
				this.$storage.del('invitecode')
				this.handleBack()
			},
			// 去注册
			toReg() {
			  this.$utils.navigateTo('/pages/login/register/index')
			},
			// 发送短信验证码
			sendCode() {
			  if (this.validateAll()) {
			    this.$utils.errorToShow(this.rules['mobile'].message)
			  } else {
			    this.$utils.loadToShow('发送中...')
			    setTimeout(() => {
			      this.$utils.loadToHide()
			      this.$api.sms({ mobile: this.mobile, code: 'login' }, res => {
			        if (res.status) {
			          this.timer = 60
			          this.verification = false
			          this.$utils.successToShow(res.msg)
			          this.countDown() // 执行验证码计时
			          // this.btnb = 'btn btn-square btn-all btn-b';
			        } else {
			          this.$utils.errorToShow(res.msg)
			        }
			      })
			    }, 1000)
			  }
			},
			
			// 验证码倒计时
			countDown() {
			  let auth_timer = setInterval(() => {
			    // 定时器设置每秒递减
			    this.timer-- // 递减时间
			    uni.setStorage({
			      key: 'timer',
			      data: this.timer,
			      success: function() {}
			    })
			    if (this.timer <= 0) {
			      this.verification = true // 60s时间结束还原v-show状态并清除定时器
			      clearInterval(auth_timer)
			    }
			  }, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-login {
		height: calc(100vh - 90upx);
		padding: 0upx 100upx;
		background-color: #fff;

		&-avatar {
			width: 180upx;
			height: 180upx;
			border-radius: 20upx;
		}

		&-icon {
			padding: 50upx 0upx;
		}

		&-input {
			margin-bottom: 50upx;

			&_item {
				border-bottom: 2upx solid #C8C8C8;
				margin-bottom: 30upx;
				padding: 10upx;
				font-size: 28upx;
				color: #333;
				position: relative;
			}
		}

		&-button {
			padding: 0upx 40upx;
			height: 90upx;
			line-height: 90upx;
			min-width: 150upx;
			border: none !important;

			&::after {
				content: " ";
				width: 200%;
				height: 200%;
				position: absolute;
				top: 0;
				left: 0;
				border: none;
				-webkit-transform: scale(.5);
				transform: scale(.5);
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				box-sizing: border-box;
				border-radius: 10upx;
			}
		}

		&-other {
			height: 71upx;
			margin-bottom: 30upx;
		}

		&-sendcaptcha {
			border: none;
			width: 40%;
			text-align: right;
			padding: 0;
			display: inline-block;
			color: #333;
			background-color: #fff;
			vertical-align: bottom;
			&::after{
				border: none;
			}
		}
	}

	.error-message {
		position: absolute;
		font-size: 16upx;
		top: 100%;
		transition: all 0.5s ease-in;
	}
</style>
