//Page Object
let app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  timer: null,
  data: {
    roomInfo: {},
    value: "",
    list: [],
    userInfo: {},
    toView: "" // scroll-into-view的id
  },

  async onLoad(options) {
    let messageObj;
    const roomInfo = JSON.parse(options.roomInfo);
    try {
      messageObj = wx.getStorageSync("message") || {};
    } catch (e) {
      console.log(e);
    }
    console.log("messageObj", messageObj);
    this.setData({
      roomInfo,
      list: messageObj[roomInfo._id] || [],
      userInfo: app.globalData.userInfo
    });
    wx.setNavigationBarTitle({ title: roomInfo.name });
  },
  onShow() {
    if (!this.timer) {
      this.init(this.data.roomInfo);
    }
  },
  onHide() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setMessageStorage();
  },

  setMessageStorage() {
    const messageStorage = wx.getStorageSync("message") || {};
    messageStorage[this.data.roomInfo._id] = this.data.list;
    wx.setStorage({
      key: "message",
      data: messageStorage
    });
  },

  async init(roomInfo) {
    await this.getMessage(roomInfo);
    const len = this.data.list.length - 1;
    if (len > 0) {
      this.setData({
        toView: "id" + this.data.list[len]._id
      });
    }
    this.timer = setInterval(() => {
      this.getMessage(roomInfo);
    }, 5000);
  },
  onInput(e) {
    console.log(e.detail.value);
    this.setData({ value: e.detail.value });
  },
  async getMessage(roomInfo) {
    const { result } = await wx.cloud.callFunction({
      // 要调用的云函数名称
      name: "message",
      data: {
        type: "getMessage",
        _id: roomInfo._id,
        skip: this.data.list.length
      }
    });
    console.log("获取getMessage", result.data);

    this.setData({
      list: this.data.list.concat(result.data)
    });
  },
  async sendMessage() {
    if (!this.data.value.trim()) {
      wx.showToast({
        title: "请输入内容",
        icon: "none"
      });
      return;
    }

    const timeStamp = +new Date();
    const { result } = await wx.cloud.callFunction({
      name: "message",
      data: {
        type: "sendMessage",
        room: this.data.roomInfo._id,
        sender: app.globalData.userInfo.openid,
        content: this.data.value,
        time: timeStamp,
        withdrawn: false,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        skip: this.data.list.length
      }
    });
    if (result._id) {
      console.log("发送成功");
      clearInterval(this.timer);
      this.init(this.data.roomInfo);
      this.setData({
        value: ""
      });
    } else {
      wx.showToast({
        icon: "none",
        title: "发送失败"
      });
    }
    // const obj = {
    //   content:this.data.value,
    //   sender:2,
    //   nickName:'王留周',
    //   avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4277010421,1238629898&fm=11&gp=0.jpg'
    // }
    // this.data.list.push(obj)
    // this.setData({
    //   list:this.data.list,
    //   value:''
    // },()=>{
    //   console.log(5555,this.data.list);
    // })
  }
});
