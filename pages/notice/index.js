//Page Object
let app = getApp();

Page({
  data: {
    active: 0,
    homeworkList: [],
    signingList: [], // 正在签到中的
    signedList: [] // 已经过时的签到 包括已签到和未签到
  },
  active: 0,
  onLoad: function(options) {},
  onShow: function() {},
  // tabs切换
  onChange(e) {
    console.log(e);
    const { index } = e.detail;
    if (index === 1 && this.data.active !== 1) {
      this.getStudentHomeworkList();
    } else if (index === 2 && this.data.active !== 2) {
      this.getAllSignList();
    }
    this.setData({
      active: index
    });
  },

  // 作业相关
  // 作业相关
  // 作业相关
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
  },

  // 下面是签到相关
  // 下面是签到相关
  // 下面是签到相关
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
