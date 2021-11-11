// miniprogram/pages/mysefl_sos/myself_sos.js
wx.cloud.init();
var util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[],
    status:"救援成功",
    status_click:true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change:function(e){
    let id= e.currentTarget.dataset.informationId;
    if(this.data.status_click){
    db.collection('user').where({
      _id:id,
    }).update({
     data:{
       status:this.data.status
     }
    })
    that.setData({
      status_click:false,
      status:"急需求救"
    })
    wx.showToast({
      title: '恭喜获救成功',
    })
  }
  else{
    db.collection('user').where({
      _id:id
    }).update({
     data:{
       status:this.data.status
     }
    })
    that.setData({
      status_click:true,
      status:"获救成功"
    })
    wx.showToast({
      title: '等待救援',
    })
    
  }
  
  },

  onLoad: function (options) {
    setInterval(function(){
      this.animate('.status',[{scale:[1,1],ease:'ease-out',opacity:0},{scale:[1.2,1.2],ease:'ease-in',opacity:1}],1000);
      this.animate('.status',[{scale:[1.2,1.2],ease:'ease-out',opacity:0},{scale:[1,1],ease:'ease-in',opacity:1}],1000);
    }.bind(this), 1000);
    var that=this;
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
        db.collection('user').where({
          _openid:that.data.openid,
          user_data:that.data.user_data
        }).get({
          success:res=>{
            console.log(that.data.user_data)
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
  onPullDownRefresh:function(){
    console.log("下拉");
    wx.cloud.init({
      env:"cloud1-6g50cg2p9bfa7e00"
    })
      wx.cloud.callFunction({
        name:'openid',
      }).then(res=>{
        this.setData({
          openid:res.result.openid
        })
        db.collection('user').where({
          _openid:that.data.openid
        }).get({
          success:res=>{
            console.log(res)
            that.setData({
              information:res.data
            })
          }
        })
      })  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉")
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
       db.collection('user').where({
         _openid:that.data.openid
       }).get({
         success:function(res){
           that.setData({
             information:res.data
           })
           console.log("成功传值")
         }
       })
     }
     )

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})