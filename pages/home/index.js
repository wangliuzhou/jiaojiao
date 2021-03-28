// pages/home/index.js
const app = getApp();

Page({
  studentList: [
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "练习册",
      path: "/pages/exerciseBook/index",
      icon: "iconlianxice-"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "视频",
      path: "/pages/video/index",
      icon: "iconicon_A"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "作业",
      path: "/pages/homework/index",
      needJoinRoom: true,
      icon: "icontubiaozhizuomoban-"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "收藏夹",
      path: "/pages/favorites/index",
      icon: "iconshoucang_huaban1"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "签到",
      path: "/pages/signIn/index",
      needJoinRoom: true,
      icon: "iconicon_A1"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "课堂",
      path: "/pages/classroom/index",
      icon: "iconyingyangketang"
    }
  ],
  teacherList: [
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "作业",
      path: "/pages/homeworkSend/index",
      icon: "icontubiaozhizuomoban-"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "签到",
      path: "/pages/signInSend/index",
      icon: "iconicon_A1"
    },
    {
      src:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      title: "课堂",
      path: "/pages/classroomSend/index",
      icon: "iconyingyangketang"
    }
  ],
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.czjdu.com%2Fark_article_upload_files%2Fjwc%2F201203%2F20120314135120120.jpg&refer=http%3A%2F%2Fwww.czjdu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619276024&t=d883cf6ca0ac537a7f6d68d1e19e0ee8",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f",
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2017%2F585%2F781%2F4676187585_997192271.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618823899&t=2f1d1a16607264ad0e284a85863c4c8f"
    ],
    lits: [],
    jionedRooms: false //学生是否加入过某个课堂
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { occupation } = app.globalData.userInfo;
    this.setData({
      list: occupation === 0 ? this.studentList : this.teacherList
    });
  },
  onShow() {
    // 先查查学生有没有加入过某个课堂
    // 如果加入过，this.data.jionedRooms将会是数组
    if (app.globalData.userInfo.occupation === 0) {
      this.checkJoinRoom();
    }
  },
  async goPage(e) {
    const { item } = e.currentTarget.dataset;
    const { path, needJoinRoom } = item;
    const { jionedRooms } = this.data;
    if (needJoinRoom) {
      console.log(jionedRooms);
      if (jionedRooms && jionedRooms.length) {
        wx.navigateTo({
          url: path
        });
      } else {
        wx.showToast({
          title: "请先加入课堂",
          icon: "none"
        });
      }
    } else {
      wx.navigateTo({
        url: path
      });
    }
  },
  // 查看学生是否加入了课堂
  async checkJoinRoom() {
    const { result } = await wx.cloud.callFunction({
      name: "users",
      data: {
        type: "getMyRooms",
        openid: app.globalData.userInfo.openid
      }
    });
    this.setData({
      jionedRooms: result.data.rooms
    });
  }
});
