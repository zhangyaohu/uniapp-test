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
				<view class="jshop-login-input_item">
					<input placeholder="请输入验证码" v-model="code" @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter"
					 @leave="handleLeave" @after-leave="handleAfterLeave" style="display: inline-block;width: 60%;" />
					<view class="jshop-login-sendcaptcha" @click="sendCode" v-if="verification">发送验证码</view>
					<view class="jshop-login-sendcaptcha" v-if="!verification">{{ timer }} 秒后重新获取</view>
				</view>
				<view class="jshop-login-input_item" v-show="!isCaptcha">
					<input placeholder="请输入密码" v-model="password" type="password" @before-enter="handleBeforeEnter" @enter="handleEnter"
					 @after-enter="handleAfterEnter" @leave="handleLeave" @after-leave="handleAfterLeave" @input="validate('password')" />
					<transition>
						<view v-if="rules['password'].error" class="jshop-error error-message">{{rules['password'].message}}</view>
					</transition>
				</view>
			</view>
			<view>
				<view>
					<button class="jshop-login-button" @click="toReg">注册</button>
				</view>
				<view class="jshop-flex jshop-flex-space-between jshop-login-other jshop-center">
					<view></view>
					<view @click="toLogin">已有账号，立即登录</view>
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
				code: '',
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
				if (!this.isCaptcha) {
					props = ['mobile', 'password']
				} else {
					props = ['mobile']
				}
				props.forEach(prop => this.validate(prop));
				return props.some(prop => this.rules[prop].error === true);
			},
			toReg() {
			  if (this.validate('mobile') && this.rules['mobile'].error) {
			    this.$utils.errorToShow(this.rules['mobile'].message);
			  } else if (!this.code) {
			    this.$utils.errorToShow('请输入短信验证码')
			  } else if (!this.password) {
			    this.$utils.errorToShow('请输入登录密码')
			  } else {
			    let data = {
			      mobile: this.mobile,
			      code: this.code,
			      password: this.password
			    }
			
			    // 获取邀请码
			    let invicode = this.$storage.get('invitecode')
			    if (invicode) {
			      data.invitecode = invicode
						}
			    this.$api.smsLogin(data, res => {
			      if (res.status) {
			        this.$storage.set('userToken', res.data)
			        this.$utils.successToShow('注册成功', () => {
			          // 清除随机uid 和 邀请码
			          this.$storage.del('uuid')
			          this.$storage.del('invitecode')
			          let redirect = this.$store.state.redirectPage
			            ? this.$store.state.redirectPage
			            : '/pages/member/index/index'
			          this.updateRedirect({
			            type: 'redirectPage',
			            page: ''
			          })
			          uni.reLaunch({
			            url: redirect
			          })
			        })
			      } else {
			        this.$utils.errorToShow(res.msg)
			      }
			    })
			  }
			},
			// 去登录
			toLogin() {
				this.$utils.navigateTo('/pages/login/login/index1')
			},
			// 发送短信验证码
			sendCode() {
				if (this.validate('mobile') && this.rules['mobile'].error) {
					this.$utils.errorToShow(this.rules['mobile'].message)
				} else if(this.validate('password') && this.rules['password'].error) {
					this.$utils.errorToShow(this.rules['password'].message)
				} else {
					this.$utils.loadToShow('发送中...')
					setTimeout(() => {
						this.$utils.loadToHide()
						this.$api.sms({
							mobile: this.mobile,
							code: 'login'
						}, res => {
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
				border-radius: 10px;
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

			&::after {
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
