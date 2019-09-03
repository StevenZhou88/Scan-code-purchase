Page({
  data: {
    ProductList:[],
    number:'',
    total:'',
    orderId:'',
    out_trade_no:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({ orderId: options.orderId})
    this.getShopping()
  },
  getShopping() {
    var that = this
    wx.request({
      url: 'http://10.0.0.43:3000/orders',
      header: { 'Authorization': 'Bearer ' + getApp().globalData.token },
      data:{id:this.data.orderId},
      success: function (res) {
       console.log(res)
       that.setData({
         ProductList: res.data.order.Order_products,
         total:res.data.total,
         number: res.data.number,
         out_trade_no: res.data.order.out_trade_no
       })
      }
    })
  },
  tenPay(){
    let out_trade_no = this.data.out_trade_no
      wx.request({
        method:'POST',
        url: 'http://10.0.0.43:3000/orders/pay',
        header: { 'Authorization': 'Bearer ' + getApp().globalData.token },
        data: { out_trade_no: out_trade_no },
        success:function(res){
          console.log(res)
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: 'MD5',
            paySign: res.data.paySign,
            success(res) {
              console.log(res)
             },
            fail(res) { 
              console.log('您取消了支付')
            }
          })
        }
      })
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