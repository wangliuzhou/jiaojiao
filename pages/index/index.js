const computedBehavior = require("miniprogram-computed");
const loginBehavior = require("../../behaviors/login");
const db = wx.cloud.database();
let app = getApp();

Component({
  behaviors: [computedBehavior, loginBehavior],
  data: {
    value: "",
    radios: [
      { value: 0, name: "学生" },
      { value: 1, name: "老师" }
    ]
  },
  computed: {},
  pageLifetimes: {},
  methods: {
    onLoad() {},

    onGetUserInfo(e) {
      console.log(e);
      if (e.detail.errMsg === "getUserInfo:ok") {
        const userInfo = e.detail.userInfo;
        // 同意授权
        app.globalData.userInfo = userInfo;
        db.collection("users")
          .add({
            data: {
              _id: this.openId,
              ...userInfo
            }
          })
          .then(res => {
            console.log(res);
            wx.switchTab({
              url: "/pages/home/index"
            });
          })
          .catch(console.error);
        wx.setStorage({
          key: "userInfo",
          data: userInfo
        });
      }
    },
    // 下拉刷新重新加载数据
    radioChange(e) {
      const { value } = e.detail;
      this.setData({
        value: ~~value
      });
    }
  }
});
