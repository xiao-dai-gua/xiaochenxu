// pages/sos1/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:true,
    music:{
      url:"",
      title:"警报声",
      status:"true",
      animation:{},
    }

  },
  // click_sos:function(){
  //   wx.navigateTo({
  //     url: '/pages/sos/sos',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  click_sos:function(){
    this.sos.translate(-80).step();
    this.animate('.help',[{opacity:1.0}],500)
    this.setData({
      sos: this.sos.export(),
      status:false
    })
  },
  sos1:function(){
    this.sos.translate(0,0).step();
    this.animate('.help',[{opacity:0}],500)
    this.setData({
      sos: this.sos.export(),
      status:true
    })
  },
  onLoad: function (options) {
    this.sos = wx.createAnimation({
     duration:'200',
      timingFunction:'ease'
    })
  },
  ring:function(event){
    this.animate('.ring_image',[{rotateY:0,ease:'ease-out'},{rotateY:360,ease:'ease-out'}],5000)
    const click_music = wx.getBackgroundAudioManager();
    click_music.src="img/14184.wav";
    console.log(click_music.src);
    click_music.title=this.data.music.title;
    console.log(this.data.music.title);
    console.log(click_music.title);
    click_music.play();
    this.setData({
      status:"fasle"
    })

  },
  call:function(){
    this.animate('.call_image',[{rotate:-40,ease:'ease'},{rotate:30,ease:'ease'},{rotate:0}],500)

    var location =wx.startLocationUpdate({
      success: (res) => {
        console.log(1);
        wx.startLocationUpdateBackground({
          success: (res) => {
             console.log(2);
            wx.getLocation({
              type: 'gcj02', //返回可以用于wx.openLocation的经纬度
              success (res) {
                console.log(3);
                const latitude = res.latitude
                const longitude = res.longitude
                wx.openLocation({
                  latitude,
                  longitude,
                  scale: 18
             })
              wx.onLocationChange({
                latitude,
                longitude,
                scale: 18
           })
         }
            })
          },
        })
      },
    })


  },
  information:function(){
    this.animate('.information_image',[{scale:[],ease:'ease-out'},{scale:[2,2],ease:'ease-in'},{scale:[1,1],ease:'ease-in'}],500)
      var that = this
      wx.getSetting({
        success: (res) => {
          // res.authSetting['scope.userLocation']  undefined-表示初始化进入该页面 false-表示非初始化进入该页面,且未授权
          if (res.authSetting['scope.userLocation'] != true) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                that.getLocation()
              },
              fail: function(error) {
                wx.showModal({
                  title: '提示',
                  content: '您未开启保定位权限，请点击确定去开启权限！',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting()
                    }
                  },
                  fail: function() {
                    wx.showToast({
                      title: '未获取定位权限，请重新打开设置',
                      icon: 'none',
                      duration: 2000 
                    })
                  }
                })
              }
            })
          }else {
            that.getLocation()
          }
        }
      })
    },
    getLocation: function(){
      const that = this
      var i = setInterval(function() {
        wx.getLocation({
          type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
          success: function(res) {
            that.setData({
              latitude: res.latitude,
              longitude: res.longitude,
            })            
            var longitude = res.longitude
            var latitude = res.latitude
            that.loadCity(longitude, latitude)
            clearInterval(i)
          },
          fail: function() {
            wx.showToast({
              title: '手机定位未打开',
              icon: 'none',
              duration: 2000 
            })
          },
          complete: function() {
            // complete  
          }
        })
      }, 2000)
    },
    loadCity: function(longitude, latitude) {
      var that = this
      //请求的地址是腾讯地图，参考文档https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview
      wx.request({
        url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude + ','+longitude +'&key=SSSBZ-SQZK6-U3XSL-EPA5P-6VNK6-ANF4P&get_poi=1',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          const data = res.data
          app.globalData.location = data.result.address_component
          var location = data.result.address
          that.setData({
            location: location
          });
        },
        fail: function() {  
          console.log("失败")
        },
        complete: function() {
          // complete  
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