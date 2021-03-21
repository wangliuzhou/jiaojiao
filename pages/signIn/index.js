// pages/home/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    signingList: [], // 正在签到中的
    signedList: [] // 已经过时的签到 包括已签到和未签到
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllSignList();
  },
  // async getStudentSignList() {
  //   console.log(222);
  //   const { result } = await wx.cloud.callFunction({
  //     name: "sign",
  //     data: {
  //       type: "getStudentSignList",
  //       openid: app.globalData.userInfo.openid
  //     }
  //   });
  // },
  async getAllSignList() {
    const { result } = await wx.cloud.callFunction({
      name: "sign",
      data: {
        type: "getAllSignList"
      }
    });
    console.log(222, result);
    const data = result.data;
    const { openid } = app.globalData.userInfo;

    // 筛选出需要自己参与的课堂
    const mySign = data.filter(item => {
      const { members } = item;
      //先找找members里对象的openid有没有等于自己的,有就会被filter出来
      // 如果有则往对象中添加status，已供页面显示签到状态 并且返回true
      const idxInMembers = members.findIndex(fItem => fItem.openid === openid);
      if (idxInMembers > -1) {
        // 找到
        item.status = members[idxInMembers].status;
        return true;
      }
      return false;
    });
    console.log("mySign", mySign);
    // 签到时间中
    const signingList = mySign.filter(item => {
      const { startTime, endTime } = item;
      const nowTime = +new Date();
      return startTime < nowTime && nowTime < endTime;
    });
    // 签到时间已过
    const signedList = mySign.filter(item => {
      const { startTime, endTime } = item;
      const nowTime = +new Date();
      return nowTime > endTime;
    });
    // 如果自己签到过，给签到过的item
    this.setData({
      signingList,
      signedList
    });
    console.log("签到时间中", signingList);
    console.log("签到时间已过", signedList);
  },
  async showConfirm(e) {
    const { item } = e.currentTarget.dataset;
    wx.showModal({
      title: "提示",
      content: `确认签到${item.name}吗`,
      success: res => {
        if (res.confirm) {
          console.log("用户点击确定");
          this.handleSigning(e);
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
  },
  async handleSigning(e) {
    const { item } = e.currentTarget.dataset;
    const { _id, members, endTime } = item;
    if (endTime < +new Date()) {
      // 不在签到时间内，已经不允许再签到了
      wx.showToast({
        title: "签到时间已过",
        icon: "none"
      });
      this.getAllSignList();
      return;
    }
    const { openid } = app.globalData.userInfo;
    const idx = members.findIndex(item => item.openid === openid);

    // 触发签到
    const { result } = await wx.cloud.callFunction({
      name: "sign",
      data: {
        type: "studentSign",
        _id,
        idx
      }
    });
    console.log(88, result);
    const sigined = result.stats.updated == 1;
    if (sigined) {
      this.getAllSignList();
    }
    wx.showToast({
      icon: "none",
      title: sigined ? "签到成功" : "签到失败"
    });
  }
});
