import store from "./store/index.js";

App({
  store,
  onLaunch() {
    console.log("app start...");
  },
  globalData: {
    //用户登录信息
    userInfo: wx.getStorageSync("userInfo") || null,
    statusBarHeight: wx.getSystemInfoSync()["statusBarHeight"],
    //系统信息
    systemInfo: wx.getSystemInfoSync()
  }
});
