// pages/home/index.js
const app = getApp();

Page({
  data: {
    homeworkList: []
  },
  onLoad: function(options) {
    this.getStudentHomeworkList();
  },
  async getStudentHomeworkList() {
    const { result } = await wx.cloud.callFunction({
      name: "homework",
      data: {
        type: "getStudentHomeworkList",
        openid: app.globalData.userInfo.openid
      }
    });
    console.log(333, result);
    this.setData({
      homeworkList: result.data
    });
  },
  // 查看作业详情
  checkHomeworkDetail(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/homeworkDetail/index?homeworkId=${item._id}`
    });
  }
});
