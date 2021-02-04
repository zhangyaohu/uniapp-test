class Storage {
	/**
	 * 得到存储值 @param {key}要得到的键值， @param sync{boolean}是否为同步
	 * */
	get(key, sync = true) {
		try {
			if(sync){
				return uni.getStorageSync(key);
			}else{
				let data = '';
				uni.getStorage({
					key:key,
					success: function (res) {
						data = res.data;
					}
				});
				return data;
			}
		} catch (e) {
		    return false;
		}
	}
	/**
	 * 设置存储 @param {key}要得到的键值， @param sync{boolean}是否为同步
	 * */
	set(key, value, sync = true) {
		try {
		    if (sync) {
		        return uni.setStorageSync(key, value);
		    } else {
		        uni.setStorage({
		            key: key,
		            data: value
		        });
		    }
		} catch (e) {
		
		}
	}
	/**
	 * 清除存储 @param sync{boolean}是否为同步
	 * */
	clear(sync = true) {
		try {
		    if (sync) {
		        return uni.clearStorageSync();
		    } else {
		        uni.clearStorage();
		    }
		} catch (e) {
		    return false;
		}
	}
	/**
	 * 存储中删除某个值 @param sync{boolean}是否为同步
	 * */
	del(key, sync = true){
	    try {
	        if (sync) {
	            return uni.removeStorageSync(key);
	        } else {
	            uni.removeStorage({
	                key: key
	            });
	        }
	    } catch (e) {
	        return false;
	    }
	}
	
	//获取用户token，如果缓存有，直接返回，如果没有，就先微信登陆，然后服务器登陆，最后返回token
    userToken(callback) {
	    var token = get('userToken');
	    if (token){
	        callback(token);
	    }else{
	        //如果没有登陆，就去登陆
	        common.jumpToLogin();
	    }
	}
}

export default new Storage();