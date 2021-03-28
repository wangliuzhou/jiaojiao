//Page Object
let app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    roomInfo: {},
    value: "",
    list: [],
    userInfo: {}
  },
  //options(Object)
  async onLoad(options) {
    const roomInfo = JSON.parse(options.roomInfo);
    console.log("roomInfo", roomInfo);
    this.setData({ roomInfo, userInfo: app.globalData.userInfo });
    wx.setNavigationBarTitle({ title: roomInfo.name });
    this.getMessage(roomInfo);
  },
  onInput(e) {
    this.setData({ value: e.detail.value });
  },
  async getMessage(roomInfo) {
    const { result } = await wx.cloud.callFunction({
      // 要调用的云函数名称
      name: "message",
      data: {
        type: "getMessage",
        _id: roomInfo._id
      }
    });
    this.setData({
      list: result.data
    });
    console.log("获取getMessage", result);
  },
  back() {
    wx.navigateBack({
      delta: 1
    });
  },
  async sendMessage() {
    const timeStamp = +new Date();
    const { result } = await wx.cloud.callFunction({
      name: "message",
      data: {
        type: "sendMessage",
        room: this.data.roomInfo._id,
        sender: app.globalData.userInfo.openid,
        content: this.data.value,
        time: timeStamp,
        withdrawn: false
      }
    });
    if (result._id) {
      console.log("发送成功");

      this.setData({
        value: ""
      });
    } else {
      wx.showToast({
        icon: "none",
        title: "发送失败"
      });
    }
  }
});
