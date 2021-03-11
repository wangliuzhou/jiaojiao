import { post } from "../utils/request";

//自动登录
export const autoLogin = () => {
  const app = getApp();
  return wx.login().then(({ code }) => {
    return post("/sysWechatThirdAuth/miniProgramLogin", {
      authAppID: app.globalData.ext.appid,
      jsCode: code,
      flag: 1
    }).then(({ data }) => {
      if (data.account) {
        // 登录成功
        loginCallback(data);
      }
    });
  });
};

// 手机号登录
export const login = ({ encryptedData, iv }) => {
  const app = getApp();
  return wx.login().then(({ code }) => {
    return post("/sysWechatThirdAuth/miniProgramLogin", {
      authAppID: app.globalData.ext.appid,
      jsCode: code,
      encryptedData,
      iv,
      flag: 0
    }).then(({ data }) => {
      if (data.account) {
        wx.showToast({
          title: "登录成功",
          icon: "none"
        });
        loginCallback(data);
      }
    });
  });
};

//登录回调
export const loginCallback = ({ account, token, tokenTime }) => {
  //设置登录信息
  setLoginInfo({ account, token, tokenTime });
  //调用页面回调
  callLoginCallback(account);
};

//设置登录信息
export const setLoginInfo = ({ account, token, tokenTime }) => {
  const app = getApp();
  app.store.setState({
    userInfo: account,
    isLogin: true
  });
  wx.setStorageSync("userInfo", account);
  wx.setStorageSync("token", token);
  wx.setStorageSync("tokenTime", tokenTime);
};

export const callLoginCallback = () => {
  let pages = getCurrentPages();
  let page = pages[pages.length - 1];
  page.loginCallback && page.loginCallback();
};

//清除用户登录信息
export const clearLoginInfo = () => {
  const app = getApp();
  app.store.setState({
    userInfo: null,
    isLogin: false
  });
  wx.removeStorageSync("userInfo");
  wx.removeStorageSync("token");
  wx.removeStorageSync("tokenTime");
};

// 授权手机号
export const authPhone = ({ encryptedData, iv, jsCode }) => {
  const app = getApp();
  return post("/sysWechatThirdAuth/miniProgramLogin", {
    authAppID: app.globalData.ext.appid,
    encryptedData,
    iv,
    jsCode,
    flag: 0
  })
    .then(({ data, data: { account, token, tokenTime } }) => {
      loginCallback({ account, token, tokenTime });
      return data;
    })
    .catch(() => {});
};

// 授权用户信息
export const authUserInfo = ({ encryptedData, iv, jsCode }) => {
  const app = getApp();
  return post("/mobile/sysWechatThirdAuth/getMiniProgramUserInfo", {
    encryptedData,
    iv,
    jsCode,
    authAppID: app.globalData.ext.appid
  })
    .then(({ data }) => {
      app.store.setState({
        userInfo: data
      });
      wx.setStorageSync("userInfo", data);

      callLoginCallback();
      return data;
    })
    .catch(err => {});
};
