// pages/home/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    times: [
      { value: 0, label: "30秒" },
      { value: 1, label: "60秒" },
      { value: 2, label: "90秒" }
    ],
    timeType: "",
    classroomList: [],
    choosedPickerIdx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTeacherRooms();
  },
  radioChange(e) {
    this.setData({
      timeType: ~~e.detail.value
    });
  },
  async setSign() {
    const { choosedPickerIdx, timeType, classroomList } = this.data;
    const { _id, name, members } = classroomList[choosedPickerIdx];
    const newMembers = members.map(openid => ({
      openid,
      status: 0
    }));
    const startTime = +new Date();
    // 要删除
    const endTime = startTime + (timeType + 1) * 30 * 1000 + 60 * 60 * 1000;
    // const endTime = startTime + (timeType + 1) * 30 * 1000;
    const { result } = await wx.cloud.callFunction({
      name: "sign",
      data: {
        type: "teacherAddSign",
        openid: app.globalData.userInfo.openid,
        roomId: _id,
        name,
        members: newMembers,
        startTime,
        endTime
      }
    });
    wx.showToast({
      title: result._id ? "设置成功" : "设置失败"
    });
  },
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
  bindRoomIdChange(e) {
    const { value } = e.detail;
    this.setData({
      choosedPickerIdx: value[0]
    });
  }
});
