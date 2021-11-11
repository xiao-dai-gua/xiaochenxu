// pages/sos1/index.js
const app = getApp();
var util = require('../../utils/util.js');
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:true,
    music:{
      url:"cloud://cloud1-6g50cg2p9bfa7e00.636c-cloud1-6g50cg2p9bfa7e00-1305605876/12310.wav",
      title:"警报声",
    },
    music_status:'true',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    user_status:true,
    user_data:""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var sos= wx.createAnimation({
     duration:'200',
      timingFunction:'ease'
    });
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
    this.sos = sos;
    var that =this;
    wx.getLocation({
      success(res){
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    });
   //获取用户信息
   if (wx.getUserProfile) {
    this.setData({
      canIUseGetUserProfile: true
    })
  }
  var that = this;
  wx.chooseLocation({
    latitude: this.data.latitude,
    longitude:this.data.longitude,
    success(res){
      that.setData({
        address:res.address
      })
      db.collection('user_location').add({
        data:{
          address:res.address,
          user_data:that.data.user_data

        }
      })
      }
})
},
  click_sos:function(){
   this.sos.translate(-80).step();
   this.animate('.help',[{opacity:1.0}],500,function(){}.bind(this));
    this.setData({
      sos: this.sos.export(),
      status:false
    })
    if(this.data.user_status)
     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
         user_status:false
        })
      }
    })

  },
  sos1:function(){
    this.sos.translate(0.0).step();
    this.animate('.help',[{opacity:0}],500)
    this.setData({
      sos: this.sos.export(),
      status:true
    })
  },
  ring:function(event){
      var music_status = this.data.music_status;
      var click_music = wx.getBackgroundAudioManager();
      click_music.src="cloud://cloud1-6g50cg2p9bfa7e00.636c-cloud1-6g50cg2p9bfa7e00-1305605876/12310.wav";
      click_music.title=this.data.music.title;
      if(music_status){
      this.animate('.ring_image',[{rotateY:0,ease:'ease-out'},{rotateY:360,ease:'ease-out'}],600)
      click_music.play();
      this.setData({
       music_status:false,
      })
    }
      else{
      click_music.stop();
      this.setData({
        music_status:"true"
      })
      }
  },
  
  

  call:function(){
    this.animate('.call_image',[{rotate:-40,ease:'ease'},{rotate:30,ease:'ease'},{rotate:0}],500),
    wx.makePhoneCall({
      phoneNumber: '110', //仅为示例，并非真实的电话号码
    })

  },
  information:function(){
    this.animate('.information_image',[{scale:[],ease:'ease-out'},{scale:[2,2],ease:'ease-in'},{scale:[1,1],ease:'ease-in'}],500);
        wx.navigateTo({
          url: "/pages/set_information/index?address="+this.data.address,
        })
    },
    myself:function(){
      wx.navigateTo({
        url: '/pages/myself/myself',
      })
    },
  rescue:function () {
    wx.navigateTo({
      url: '../rescue/rescue',
    })
  },
  write:function () {
    wx.navigateTo({
      url: '../write/write',
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
    this.animate('.circle1',[{scale:[],ease:'ease-out'},{scale:[2,2],ease:'ease-in'},{scale:[1,1],ease:'ease-in'}],200);
  setInterval(function(){
    this.animate('.write_image',[{rotate:-40,ease:'ease'},{rotate:30,ease:'ease'},{rotate:0}],400);
    this.animate('.rescue_image',[{scale:[1,1],ease:'ease-out',opacity:0},{scale:[1.2,1.2],ease:'ease-in',opacity:1}],1000);
    this.animate('.rescue_image',[{rotateY:-360,ease:"ease"},{rotateY:0,ease:"ease"}],800)
  }.bind(this), 1000);
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