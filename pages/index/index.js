const loginBehavior = require("../../behaviors/login");
import { getOpenId } from "../../utils/account";

const db = wx.cloud.database();
let app = getApp();

Component({
  behaviors: [loginBehavior],
  data: {
    value: "", // 职业0学生   1老师
    radios: [
      { value: 0, name: "学生" },
      { value: 1, name: "老师" }
    ],
    canIUseGetUserProfile: false
  },
  methods: {
    onLoad() {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        });
      }
    },

    async sendInfo(userInfo) {
      // 同意授权
      const openid = await getOpenId();
      userInfo.openid = openid;
      userInfo.occupation = this.data.value;
      app.globalData.userInfo = userInfo;
      console.log("userInfo", userInfo);

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
    },
    async getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          console.log(888, res);
          if (res && res.userInfo) {
            this.sendInfo(res.userInfo);
          }
        }
      });
    },

    async onGetUserInfo(e) {
      if (e.detail.errMsg === "getUserInfo:ok") {
        this.sendInfo(e.detail.userInfo);
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
