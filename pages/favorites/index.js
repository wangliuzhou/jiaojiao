import videoList from "./../../utils/videoList";
const db = wx.cloud.database();
let app = getApp();

Page({
  data: {
    list: []
  },
  async onLoad(options) {
    const { data } = await db
      .collection("users")
      .doc(app.globalData.userInfo.openid)
      .get();
    const { likeVideo = [] } = data;
    const newList = videoList.filter(obj => {
      return likeVideo.includes(obj.url);
    });
    this.setData({
      list: newList
    });
  }
});
