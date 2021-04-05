import videoList from "./../../utils/videoList";
const db = wx.cloud.database();
let app = getApp();

Page({
  data: {
    list: [],
    loading: true
  },
  async onLoad(options) {
    wx.showLoading({
      title: "加载中"
    });
    const { data } = await db
      .collection("users")
      .doc(app.globalData.userInfo.openid)
      .get();
    const { likeVideo = [] } = data;
    const newList = videoList.filter(obj => {
      return likeVideo.includes(obj.url);
    });
    wx.hideLoading();
    this.setData({
      list: newList,
      loading: false
    });
  }
});
