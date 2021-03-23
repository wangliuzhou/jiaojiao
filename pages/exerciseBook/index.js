//Page Object
Page({
  data: {
    list: [
      {
        name: "基础练习",
        id: 0
      },
      {
        name: "中级练习",
        id: 1
      },
      {
        name: "高级练习",
        id: 2
      }
    ]
  },
  onLoad: function(options) {},
  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/exerciseBook/detail/index?id=" + id
    });
  }
});
