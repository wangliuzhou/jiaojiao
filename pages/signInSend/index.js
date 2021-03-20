// pages/home/index.js
const app = getApp();

Page({
  studentList: [
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "练习册",
      url: "/pages/exerciseBook/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "视频课",
      url: "/pages/video/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "作业",
      url: "/pages/homework/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "收藏夹",
      url: "/pages/favorites/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "签到",
      url: "/pages/signIn/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "课堂",
      url: "/pages/classroom/index"
    }
  ],
  teacherList: [
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "作业",
      url: "/pages/homeworkSend/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "签到",
      url: "/pages/signInSend/index"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "班级",
      url: "/pages/classroomSend/index"
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
