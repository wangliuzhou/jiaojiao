import store from "./store/index.js";

App({
  store,
  onLaunch() {
    console.log("app start...");
    wx.cloud.init({
      env: "cloud1-6g5tyhsr51195a0c"
    });
  },
  globalData: {
    //用户登录信息
    userInfo: wx.getStorageSync("userInfo") || null
  }
});
