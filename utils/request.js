import { getUrl } from "../configs/url";
import lzwx from "../helper/lzwx";
import {
  autoLogin,
  clearLoginInfo,
  setCurPageLoginStatus
} from "../utils/account";

const request = ({ method, url, data, header }) => {
  let token = wx.getStorageSync("token") || "";

  return lzwx
    .request({
      method,
      url: getUrl(url),
      data,
      header: {
        ...header,
        "x-access-token": token
      }
    })
    .then(({ data }) => {
      if (data.code === 200) {
        return data;
      } else if (data.code === 500001) {
        // wx.showToast({
        // 	title: data.message,
        // 	icon: "none",
        // });
        //用户信息有误或者失效，先清除用户信息
        clearLoginInfo();
        //自动登录
        autoLogin();
        throw new Error(data.message);
      } else {
        wx.showToast({
          title: data.message,
          icon: "none"
        });
        throw new Error(data.message);
      }
    });
};

export const post = (url, data, header) => {
  return request({ method: "POST", url, data, header });
};

export const get = (url, data, header) => {
  return request({ method: "GET", url, data, header });
};
