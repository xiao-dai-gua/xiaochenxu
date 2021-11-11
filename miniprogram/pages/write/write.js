// miniprogram/pages/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  sos:function(){
    wx.navigateTo({
      url: '../mysefl_sos/myself_sos',
    })
  },
  group:function(){
    wx.navigateTo({
      url: '../group/group',
    })
  },
  onLoad: function (options) {
    setInterval(function(){
      this.animate('.button',[{scale:[1,1],ease:'ease-out',opacity:0},{scale:[1.2,1.2],ease:'ease-in',opacity:1}],1000);
      this.animate('.button',[{scale:[1.2,1.2],ease:'ease-out',opacity:0},{scale:[1,1],ease:'ease-in',opacity:1}],1000);
    }.bind(this), 10);
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