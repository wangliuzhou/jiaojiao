//Page Object
let app = getApp();

Page({
  data: {
    userInfo: {}
  },
  //options(Object)
  onLoad: function(options) {
    console.log(this.data.userInfo);
  },
  onReady: function() {},
  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  goChangeInfoPage(e) {
    const { type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/changeInfo/index?type=" + type
    });
  }
});
