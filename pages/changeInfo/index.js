// pages/changeInfo/index.js
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: null, // 1:姓名修改  2:头像修改
    name: "",
    imgUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: +options.type
    });
  },
  async changeName() {
    const { result } = await wx.cloud.callFunction({
      name: "users",
      data: {
        type: "changeName",
        openid: app.globalData.userInfo.openid,
        newName: this.data.name
      }
    });
    console.log(888, result);
    if (result.stats.updated === 1) {
      app.globalData.userInfo.nickName = this.data.name;
      wx.setStorage({
        key: "userInfo",
        data: app.globalData.userInfo
      });
      wx.showToast({
        title: "操作成功",
        icon: "none"
      });
      wx.navigateBack({
        delta: 1
      });
    }
  },
  inputChange(e) {
    this.setData({
      name: e.detail.value.trim()
    });
  },
  chooseHeader() {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          imgUrl: tempFilePath
        });
      }
    });
  },

  /**
   * 上传文件
   */
  changeHeaderImageUrl() {
    wx.showLoading({
      title: "上传中...",
      mask: true
    });
    const { imgUrl } = this.data;
    const timeStamp = +new Date() + "";

    wx.cloud
      .uploadFile({
        cloudPath: timeStamp, // 云储存上的路径
        filePath: imgUrl // 文件临时路径
      })
      .then(res => {
        console.log("上传成功", res.fileID);
        this.changeHeaderImg(res.fileID);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async changeHeaderImg(fileID) {
    const { result } = await wx.cloud.callFunction({
      name: "users",
      data: {
        type: "changeHeaderImg",
        openid: app.globalData.userInfo.openid,
        newHeaderImg: fileID
      }
    });
    console.log(888, result);
    if (result.stats.updated === 1) {
      app.globalData.userInfo.avatarUrl = fileID;
      wx.setStorage({
        key: "userInfo",
        data: app.globalData.userInfo
      });
      wx.showToast({
        title: "操作成功",
        icon: "none"
      });
      wx.navigateBack({
        delta: 1
      });
    }
  }
});
