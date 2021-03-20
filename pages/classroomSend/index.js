// pages/home/index.js
const app = getApp();
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classroomList: [1],
    classRoomName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTeacherRooms();
  },

  // 获取用户老师的课堂列表
  async getTeacherRooms() {
    const { result } = await wx.cloud.callFunction({
      name: "room",
      data: {
        type: "getTeacherRooms",
        openid: app.globalData.userInfo.openid
      }
    });
    console.log("获取课堂list", result);
    this.setData({
      classroomList: result.data
    });
  },

  onInputChange(e) {
    const { value } = e.detail;
    this.setData({ classRoomName: value });
  },

  // 创建课堂
  async onCreateClassRoom() {
    const { classRoomName } = this.data;
    if (classRoomName.trim()) {
      const { result } = await wx.cloud.callFunction({
        // 要调用的云函数名称
        name: "room",
        data: {
          type: "addRoom",
          name: classRoomName,
          openid: app.globalData.userInfo.openid
        }
      });
      if (result._id) {
        wx.showToast({
          icon: "none",
          title: "创建课堂成功"
        });
        this.getTeacherRooms();
      }
    } else {
      wx.showToast({
        title: "请先输入名称",
        icon: "none"
      });
    }
  },

  // 复制课堂唯一码
  setClipboardData(e) {
    const { id } = e.currentTarget.dataset;
    wx.setClipboardData({
      data: id,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data); // data
          }
        });
      }
    });
  }
});
