var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'LRTBZ-VPC3V-FPZP5-U2EQU-2B4HS-QQFAP'  //申请的开发者秘钥key
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  toShopping_cart(){
    wx:wx.navigateTo({
      url: '/pages/shopping cart/shopping cart',
    })
  },
  getPosition(){
    wx.getLocation({
      type: 'wgs84',
      success: function(res){
        console.log(res)
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          name: '我现在的位置'
        })
        // qqmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (res) {
        //     console.log(res);
        //   }
          
        // })
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})