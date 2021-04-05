//Page Object
let app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    active: 0,
    homeworkList: [],
    signingList: [], // 正在签到中的
    signedList: [], // 已经过时的签到 包括已签到和未签到
    rooms: [],
    roomsDetailInfo: [],
    occupation: 1
  },
  onLoad: function(options) {
    // 获取学生作业数据
    if (app.globalData.userInfo.occupation === 0) {
      this.getStudentHomeworkList();
    }
  },
  async onShow() {
    const { data } = await db
      .collection("users")
      .doc(app.globalData.userInfo.openid)
      .get();

    wx.setStorage({
      key: "userInfo",
      data
    });
    console.log(8899, data);

    const { rooms = [], occupation } = data;
    if (rooms.length !== this.data.rooms.length) {
      // 新添加了room
      this.setData({ rooms, occupation });
    }
    if (occupation === 1) {
      // 获取群聊数据
      this.getRoomsDetail();
    }
    if (this.data.active === 1 || occupation === 1) {
      this.getChatCount(this.data.roomsDetailInfo);
    }
  },
  // tabs切换
  onChange(e) {
    console.log(e);
    const { index } = e.detail;
    if (index === 0 && this.data.active !== 0) {
      // 获取作业数据
      this.getStudentHomeworkList();
    } else if (index === 1 && this.data.active !== 1) {
      // 获取群聊数据
      this.getRoomsDetail();
    } else if (index === 2 && this.data.active !== 2) {
      // 获取签到数据
      this.getAllSignList();
    }
    this.setData({
      active: index
    });
  },

  // 群聊相关
  // 群聊相关
  // 群聊相关

  async getChatCount(list) {
    const counts = await Promise.all(
      list.map(async item => {
        return wx.cloud.callFunction({
          name: "message",
          data: {
            type: "getMessageCount",
            _id: item._id
          }
        });
      })
    );
    const messageObj = wx.getStorageSync("message") || {};
    this.data.roomsDetailInfo.forEach((item, index) => {
      const storageRoomMessage = messageObj[item._id] || [];
      const storageRoomMessageCount = storageRoomMessage.length;
      item.addMessageCount =
        counts[index].result.total - storageRoomMessageCount;
    });
    this.setData({ roomsDetailInfo: this.data.roomsDetailInfo });
  },
  async getRoomsDetail() {
    const { result } = await wx.cloud.callFunction({
      name: "room",
      data: {
        type: "getRoomsDetail",
        rooms: this.data.rooms
      }
    });
    console.log("getRoomsDetail", result);
    this.setData(
      {
        roomsDetailInfo: result.data
      },
      () => {
        this.getOwnerHeaderImg(result.data);
        this.getChatCount(result.data);
      }
    );
  },
  // 获取设置群主头像
  async getOwnerHeaderImg(list) {
    const users = await Promise.all(
      list.map(async item => {
        return await db
          .collection("users")
          .doc(item.owner)
          .get();
      })
    );
    this.data.roomsDetailInfo.forEach((item, index) => {
      item.ownerHeaderImg = users[index].data.avatarUrl;
    });
    this.setData({ roomsDetailInfo: this.data.roomsDetailInfo });
  },

  async tapRoomItem(e) {
    const { roomInfo } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/chatRoom/index?roomInfo=" + JSON.stringify(roomInfo)
    });

    console.log("roomId", roomInfo);
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
    console.log("作业列表", result);
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
