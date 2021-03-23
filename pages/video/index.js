//Page Object
import videoList from "./../../utils/videoList";
const db = wx.cloud.database();
const _ = db.command;
let app = getApp();

Page({
  data: {
    list: videoList
  },
  async onLoad(options) {
    const { data } = await db
      .collection("users")
      .doc(app.globalData.userInfo.openid)
      .get();
    const { likeVideo = [] } = data;
    this.data.list.forEach(obj => {
      const isExist = likeVideo.some(url => obj.url === url);
      if (isExist) {
        obj.favorites = true;
      }
    });
    this.setData({
      list: this.data.list
    });
    console.log(111, data);
  },

  async favorites(e) {
    const { index } = e.currentTarget.dataset;
    const item = this.data.list[index];
    item.favorites = !item.favorites;
    if (item.favorites) {
      await db
        .collection("users")
        .doc(app.globalData.userInfo.openid)
        .update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            likeVideo: _.push([item.url])
          }
        });
    } else {
      const { data } = await db
        .collection("users")
        .doc(app.globalData.userInfo.openid)
        .get();
      const { likeVideo = [] } = data;
      const newLikeList = likeVideo.filter(url => url !== item.url);
      await db
        .collection("users")
        .doc(app.globalData.userInfo.openid)
        .update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            likeVideo: newLikeList
          }
        });
    }
    wx.showToast({
      title: item.favorites ? "收藏成功" : "取消收藏"
    });
    this.setData({
      [`list[${index}]`]: item
    });
  }
});
