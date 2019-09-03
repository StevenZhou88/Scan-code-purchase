Page({
  data: {
    ProductList:[],
    number:'',
    total:''
  },
  getQr(){
    let that = this
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res.result)
        wx.request({
          method: 'POST',
          url: 'http://10.0.0.43:3000/carts',
          header: { 'Authorization': 'Bearer ' + getApp().globalData.token },
          data:{
            code: res.result
          },
          success:function(res){
            // console.log(res)
            if(!res.data.success){
              wx.showToast({
                title: '没有此商品',
                icon: 'none',
                duration: 2000
              })
              
            }else{
              wx.showToast({
                title: '添加成功',
                icon: 'none',
                duration: 2000
              })
              that.getShopping()
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopping()
  },
  toSettlement(){
    wx,wx.request({
      method:'POST',
      url: 'http://10.0.0.43:3000/orders',
      header: { 'Authorization': 'Bearer ' + getApp().globalData.token },
      success:function(res){
        console.log(res)
        wx.navigateTo({
          url: `/pages/settlement/settlement?orderId=${res.data.orderId}`
        })
      }
    })
      
  },
  ChangeNum(e){
    let that = this
    let cart_id = e.currentTarget.dataset.cart_id
    let type = e.currentTarget.dataset.type
    wx.request({
      method:'PUT',
      url: 'http://10.0.0.43:3000/carts',
      data: { cart_id: cart_id, type: type },
      header: {'Authorization': 'Bearer ' + getApp().globalData.token},
      success:function(res){
        console.log(res)
        that.getShopping()
      }
    })
  },
  ShoppingBag(e){
    console.log(e.currentTarget.dataset.code)
    let that = this
    let code = e.currentTarget.dataset.code
    wx.request({
      method: 'POST',
      url: 'http://10.0.0.43:3000/carts',
      data: { code:code },
      header: { 'Authorization': 'Bearer ' + getApp().globalData.token },
      success: function (res) {
        that.getShopping()
      }
    })
    
  },
  getShopping(){
    var that = this
    wx.request({
      url: 'http://10.0.0.43:3000/carts',
      header: { 'Authorization': 'Bearer ' + getApp().globalData.token},
      success:function(res){
        console.log(res)
        that.setData({
          ProductList: res.data.data,
          number: res.data.number,
          total: res.data.total
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