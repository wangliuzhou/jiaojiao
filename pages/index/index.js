const computedBehavior = require("miniprogram-computed");
const loginBehavior = require("../../behaviors/login");
import { getOpenId } from "../../utils/account";

const db = wx.cloud.database();
let app = getApp();

Component({
  behaviors: [computedBehavior, loginBehavior],
  data: {
    value: "", // 职业0学生   1老师
    radios: [
      { value: 0, name: "学生" },
      { value: 1, name: "老师" }
    ]
  },
  computed: {},
  pageLifetimes: {},
  methods: {
    onLoad() {},

    async onGetUserInfo(e) {
      console.log(e);
      if (e.detail.errMsg === "getUserInfo:ok") {
        const userInfo = e.detail.userInfo;
        // 同意授权
        const { openid } = await getOpenId();
        userInfo.openid = openid;
        userInfo.occupation = this.data.value;
        app.globalData.userInfo = userInfo;

        db.collection("users")
          .add({
            data: {
              _id: openid,
              ...userInfo
            }
          })
          .then(() => {
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
