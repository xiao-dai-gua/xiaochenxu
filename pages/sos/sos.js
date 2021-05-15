// pages/sos/sos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:{
      url:"",
      title:"",
      status:"true",
      animation:{},
    }

  },

  start_music:function(event){
    console.log(this.data)
    var click_music = wx.getBackgroundAudioManager();
    click_music.src="";
    click_music.title=this.data.music.title;
    this.setData({
      status:"fasle"
    })
  },
  stop_music:function(event){
    var click_stop = wx.getBackgroundAudioManager();
    click_stop.stop();
    this.setData({
      status:"true"
    })
  },
  click_ring:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (event) {
    this.data.animation = wx.createAnimation();
    console.log(this.data.animation)
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