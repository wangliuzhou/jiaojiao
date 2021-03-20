const app = getApp();
const db = wx.cloud.database();

// 获取openid
export const getOpenId = async () => {
  const { result } = await wx.cloud.callFunction({
    // 要调用的云函数名称
    name: "getOpenId"
  });
  return result;
};

// 查询数据库是否有记录
export const checkResult = async () => {
  const { data = [] } = await db
    .collection("users")
    .where({ _openid: "{openid}" })
    .get();
  console.log("checkResult", data);

  if (data.length) {
    // 已授权登录过，数据库有记录
    app.globalData.userInfo = data[0];
    wx.switchTab({
      url: "/pages/home/index"
    });
    wx.setStorage({
      key: "userInfo",
      data: data[0]
    });
  }
};

//自动登录
export const autoLogin = async () => {
  await checkResult();
  // await getOpenId();
};
