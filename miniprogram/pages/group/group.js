// miniprogram/pages/group/group.js
wx.cloud.init();
var util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[]
  },
  handhelp(e){
    const {value} =e.detail;
    if(!value.trim()){
      return
    }
    this.qsearch(value);
  },
  async qsearch(query){
    var that = this
    var information = query;
    var currenTime = that.data.currenTime
    db.collection("documentary").add({
      data:{
      message:information,
      data:currenTime
      }
    })
    wx.showToast({
      title: '记录成功',
    })
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // 调用函数时，传入new Date()参数，返回值是日期和时间
   var currenTime= util.formatTime(new Date());
   // 再通过setData更改Page()里面的data，动态更新页面的数据
   this.setData({
     currenTime: currenTime
   });
   var that = this;
   wx.cloud.init({
    env:"cloud1-6g50cg2p9bfa7e00"
  })
    wx.cloud.callFunction({
      name:'openid',
    }).then(res=>{
      this.setData({
        openid:res.result.openid
      })
      db.collection('documentary').where({
        _openid:that.data.openid
      }).get({
        success:function(res){
          that.setData({
            information:res.data
          })
        }
      })
    }
    )
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
    var that = this;
    wx.cloud.init({
     env:"cloud1-6g50cg2p9bfa7e00"
   })
     wx.cloud.callFunction({
       name:'openid',
     }).then(res=>{
       this.setData({
         openid:res.result.openid
       })
       db.collection('documentary').where({
         _openid:that.data.openid
       }).get({
         success:function(res){
           that.setData({
             information:res.data
           })
         }
       })
     }
     )
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