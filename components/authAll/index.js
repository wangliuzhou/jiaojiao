import { get, post } from "../../utils/request";
import { authPhone, authUserInfo } from "../../utils/account";
const app = getApp();
Component({
  properties: {
    type: {
      type: String,
      value: "phone"
    }
  },
  methods: {
    checkSession(e) {
      let { encryptedData, iv } = e.detail;
      if (!encryptedData || !iv) {
        wx.showToast({ title: "您已取消授权", icon: "none" });
        return;
      }
      wx.showLoading({
        mask: true
      });
      wx.login().then(({ code }) => {
        if (e.type === "getphonenumber") {
          this.postPhone({ encryptedData, iv, jsCode: code });
        } else {
          this.postUserInfo({ encryptedData, iv, jsCode: code });
        }
      });
    },
    postPhone({ encryptedData, iv, jsCode: code }) {
      authPhone({ encryptedData, iv, jsCode: code }).then(res => {
        wx.hideLoading();
        if (res) {
          wx.showToast({ title: "授权手机号成功!", icon: "none" });
        }
      });
    },
    postUserInfo({ encryptedData, iv, jsCode: code }) {
      authUserInfo({ encryptedData, iv, jsCode: code }).then(res => {
        wx.hideLoading();
        if (res) {
          wx.showToast({ title: "授权用户信息成功!", icon: "none" });
        }
      });
    }
  }
});
