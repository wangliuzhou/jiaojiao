// pages/home/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    radioValue: 0,
    inputValue: "",
    imgUrl: "",
    fileUrl: "",
    choosedPickerIdx: 0,
    rooms: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTeacherRooms();
  },
  //获取此老师创建的所有课堂
  async getTeacherRooms() {
    const { result } = await wx.cloud.callFunction({
      name: "room",
      data: {
        type: "getTeacherRooms",
        openid: app.globalData.userInfo.openid
      }
    });
    console.log("获取课堂list", result);
    this.setData({
      rooms: result.data
    });
  },
  bindRoomIdChange(e) {
    const { value } = e.detail;
    this.setData({
      choosedPickerIdx: value[0]
    });
  },
  radioChange(e) {
    this.setData({ radioValue: ~~e.detail.value });
  },
  // 文字作业输入
  onInput(e) {
    this.setData({ inputValue: e.detail.value.trim() });
  },
  onChooseImage() {
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
  onChooseMessageFile() {
    wx.chooseMessageFile({
      count: 1,
      type: "all",
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFile = res.tempFiles[0];
        console.log("tempFile", tempFile);

        this.setData({
          fileUrl: tempFile.path,
          fileName: tempFile.name
        });
      }
    });
  },

  // 老师确定上传作业
  handleClickSubmit() {
    const { radioValue, inputValue, imgUrl, fileUrl } = this.data;
    const a = radioValue === 0 && inputValue;
    const b = radioValue === 1 && imgUrl;
    const c = radioValue === 2 && fileUrl;
    if (a) {
      this.teacherAddHomework();
    } else if (b || c) {
      this.upload();
    } else {
      wx.showToast({
        title: "请先提供作业内容",
        icon: "none"
      });
    }
  },

  /**
   * 上传文件
   */
  upload() {
    const { imgUrl, fileUrl, radioValue, fileName } = this.data;
    const timeStamp = +new Date() + "";
    const fileCloudPath = timeStamp + fileName;

    wx.cloud
      .uploadFile({
        cloudPath: radioValue === 1 ? timeStamp : fileCloudPath, // 云储存上的路径
        filePath: radioValue === 1 ? imgUrl : fileUrl // 文件临时路径
      })
      .then(res => {
        console.log("上传成功", res);

        this.teacherAddHomework(res.fileID);
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
   * 创建作业
   * @param {Sting} fileID 云空间文件路径
   */
  async teacherAddHomework(fileID) {
    console.log("teacherAddHomework fileID", fileID);

    const { radioValue, inputValue, choosedPickerIdx, rooms } = this.data;
    const { members, _id, name } = rooms[choosedPickerIdx];
    const newMembers = members
      // .filter(openid => openid !== app.globalData.userInfo.openid) // 过滤老师本人
      .map(openid => ({
        openid,
        status: 0 // 0代表未查看   1代表已查看
      }));
    const { result } = await wx.cloud.callFunction({
      name: "homework",
      data: {
        type: "teacherAddHomework",
        openid: app.globalData.userInfo.openid,
        roomId: _id,
        name,
        members: newMembers,
        homeworkType: radioValue,
        homeworkText: radioValue === 0 ? inputValue : "",
        homeworkImgId: radioValue === 1 ? fileID : "",
        homeworkFileId: radioValue === 2 ? fileID : ""
      }
    });
    if (result._id) {
      wx.showToast({
        icon: "none",
        title: "作业发布成功"
      });
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.showToast({
        icon: "none",
        title: "作业发布失败"
      });
    }
    console.log(888, result);
  }
});
