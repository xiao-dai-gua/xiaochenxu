
// miniprogram/pages/rescue/rescue.js
wx.cloud.init();
const db = wx.cloud.database();
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[],
    openid:"",
    user_openid:[],
    user_data:[],
    user_information:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (e) {
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      var currenTime= util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
        currenTime: currenTime
      });
      var b="";
      for(var i=0 ;i<11;i++){
        b+=currenTime[i];
      }
      this.setData({
        user_data:b
      })
      console.log(this.data.user_data);
    
    var that = this
    wx.cloud.init({
      env:"cloud1-6g50cg2p9bfa7e00"
    })
      wx.cloud.callFunction({
        name:'openid',
      }).then(res=>{
        this.setData({
          openid:res.result.openid
        })
        //找到本地的openid
        db.collection('user').where({
          _openid:that.data.openid
        }).get({
          //找到本地的求救信号
          success:res=>{
            for(var i =0 ;i<res.data.length;i++)
      {
        //找到同本地相同地点同一天的用户的openid
        db.collection('user_location').where({
          address:res.data[i].sos_address,
          user_data:that.data.user_data

        }).get({
          success:res=>{
            for(var i=0; i<res.data.length; i++){
              //对相同地点的其他用户的求救信息的输出
              db.collection('user').where({
                sos_address:res.data[i].address
              }).get({
                success:res=>{
                  that.setData({
                    information:res.data
                  })
                }
              })
            }
          }   
        })
      }
    }
  })
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