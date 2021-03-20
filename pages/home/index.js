// pages/home/index.js
const app = getApp();

Page({
  studentList: [
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "练习册",
      path: "/pages/exerciseBook/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "视频课",
      path: "/pages/video/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "作业",
      path: "/pages/homework/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "收藏夹",
      path: "/pages/favorites/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "签到",
      path: "/pages/signIn/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "课堂",
      path: "/pages/classroom/index"
    }
  ],
  teacherList: [
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "作业",
      path: "/pages/homeworkSend/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "签到",
      path: "/pages/signInSend/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "课堂",
      path: "/pages/classroomSend/index"
    }
  ],
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData);
    const { occupation } = app.globalData.userInfo;
    this.setData({
      list: occupation === 0 ? this.studentList : this.teacherList
    });
  },
  goPage(e) {
    const { path } = e.currentTarget.dataset;
    wx.navigateTo({
      url: path
    });
  }
});
