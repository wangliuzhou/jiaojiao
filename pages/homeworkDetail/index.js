// pages/homeworkDetail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    homework: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    const { homeworkId } = options;
    this.getHomeworkDetail(homeworkId);
  },
  /**
   * 获取作业详情
   * @param {String} _id homework的id
   */
  async getHomeworkDetail(_id) {
    const { result } = await wx.cloud.callFunction({
      name: "homework",
      data: {
        type: "getHomeworkDetail",
        _id
      }
    });
    console.log(333, result);
    this.setData({
      homework: result.data
    });
  },
  previewImage() {
    wx.previewImage({
      current: 0, // 当前显示图片的http链接
      urls: [this.data.homework.homeworkImgId] // 需要预览的图片http链接列表
    });
  },
  async downloadFile() {
    console.log("开始下载", this.data.homework.homeworkFileId);
    const { tempFilePath } = await wx.cloud.downloadFile({
      fileID: this.data.homework.homeworkFileId
    });
    console.log("tempFilePath", tempFilePath);

    if (tempFilePath) {
      wx.openDocument({
        filePath: tempFilePath,
        success: function(res) {
          console.log("打开文档成功");
        },
        fail: err => {
          console.log(err);
          wx.showToast({
            title: err.errMsg,
            icon: "none"
          });
        }
      });
    } else {
      wx.showToast({
        title: "下载文档失败",
        icon: "none"
      });
    }
    console.log(666, tempFilePath);
  }
});
