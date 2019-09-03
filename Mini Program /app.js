//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            method: 'POST',
            url: 'http://10.0.0.21:3000/users/login',
            data: { code: code },
            header: { 'content-type': 'application/json' },

            // 成功回调 把token存到本地
            success: function (res) {
              console.log(res.data)
              //  this.globalData.token = res.data.token
              getApp().globalData.token = res.data.token

              var getAppInfo = getApp().globalData.token;
              console.log(getAppInfo)
            }
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token:''
  }
})