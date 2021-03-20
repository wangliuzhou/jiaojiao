// pages/home/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    joinedRoomList: [], // 已加入的课堂
    notJoinedRoomList: [], // 未加入的课堂
    show: false,
    inputValue: "",
    classroomId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStudentRooms();
  },

  // 获取用户老师的课堂列表
  async getStudentRooms() {
    const { openid } = app.globalData.userInfo;
    const {
      result: { data }
    } = await wx.cloud.callFunction({
      name: "room",
      data: {
        type: "getStudentRooms",
        openid
      }
    });
    const joinedRoomList = data.filter(item => item.members.includes(openid));
    const notJoinedRoomList = data.filter(
      ({ members }) => !members.includes(openid)
    );
    this.setData({
      joinedRoomList,
      notJoinedRoomList
    });
    console.log("获取课堂list", data);
  },

  // 用户点击课堂名称，触发加入课堂
  onTapClassName(e) {
    const { id } = e.currentTarget.dataset;
    console.log(id);
    this.setData({ show: true, classroomId: id });
  },

  // 关闭遮罩
  onClose() {
    this.setData({ show: false, inputValue: "" });
  },

  // 输入设置课堂唯一码
  onIdIput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 点击加入课堂按钮
  async joinClass() {
    const { classroomId, inputValue } = this.data;
    if (classroomId === inputValue) {
      const { result } = await wx.cloud.callFunction({
        name: "room",
        data: {
          type: "studentJoinRoom",
          openid: app.globalData.userInfo.openid,
          roomId: classroomId
        }
      });
      if (result.stats.updated === 1) {
        wx.showToast({
          icon: "none",
          title: "加入成功"
        });
        this.onClose();
      } else {
        wx.showToast({
          icon: "none",
          title: "数据库错误，请重新加入"
        });
      }
    } else {
      wx.showToast({
        icon: "none",
        title: "课堂码不正确"
      });
    }
  }
});
