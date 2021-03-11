import Store from "wxministore";

export default new Store({
  state: {
    userInfo: wx.getStorageSync("userInfo") || null,
    isLogin: !!wx.getStorageSync("userInfo")
  },
  methods: {}
});
