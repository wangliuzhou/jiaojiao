// pages/exerciseBook/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    list: [],
    list0: {
      radioList: [
        {
          qId: 0,
          question: "1+1等于几？",
          exactAnswerId: 0,
          answers: [
            {
              text: 2,
              aId: 0
            },
            {
              text: 3,
              aId: 1
            }
          ]
        },
        {
          qId: 1,
          question: "2+2等于几？",
          exactAnswerId: 1,
          answers: [
            {
              text: 3,
              aId: 0
            },
            {
              text: 4,
              aId: 1
            },
            {
              text: 5,
              aId: 2
            }
          ]
        }
      ],
      checkboxList: [
        {
          qId: 2,
          question: "孙行者的师傅叫什么？",
          exactAnswerId: [1, 2],
          answers: [
            {
              text: "乔乔",
              aId: 0
            },
            {
              text: "唐僧",
              aId: 1
            },
            {
              text: "菩提祖师",
              aId: 2
            }
          ]
        },
        {
          qId: 3,
          question: "刘备的兄弟叫？",
          exactAnswerId: [0, 1],
          answers: [
            {
              text: "张飞",
              aId: 0
            },
            {
              text: "关羽",
              aId: 1
            },
            {
              text: "蜡笔小新",
              aId: 2
            }
          ]
        }
      ]
    },
    list1: {
      radioList: [
        {
          qId: 0,
          question: "2+2等于几？",
          exactAnswerId: 0,
          answers: [
            {
              text: 4,
              aId: 0
            },
            {
              text: 5,
              aId: 1
            }
          ]
        },
        {
          qId: 1,
          question: "2+8等于几？",
          exactAnswerId: 1,
          answers: [
            {
              text: 3,
              aId: 0
            },
            {
              text: 10,
              aId: 1
            },
            {
              text: 5,
              aId: 2
            }
          ]
        }
      ],
      checkboxList: [
        {
          qId: 2,
          question: "四大名著有哪些？",
          exactAnswerId: [0, 1],
          answers: [
            {
              text: "红楼梦",
              aId: 0
            },
            {
              text: "西游记",
              aId: 1
            },
            {
              text: "聊斋志异",
              aId: 2
            }
          ]
        },
        {
          qId: 3,
          question: "谁去西天取经？",
          exactAnswerId: [0, 1],
          answers: [
            {
              text: "唐僧",
              aId: 0
            },
            {
              text: "白龙马",
              aId: 1
            },
            {
              text: "樱桃小丸子",
              aId: 2
            }
          ]
        }
      ]
    },
    list2: {
      radioList: [
        {
          qId: 0,
          question: "清华和浙大哪个好？",
          exactAnswerId: 0,
          answers: [
            {
              text: "清华",
              aId: 0
            },
            {
              text: "浙大",
              aId: 1
            }
          ]
        }
      ],
      checkboxList: [
        {
          qId: 3,
          question: "谁不去西天取经？",
          exactAnswerId: [0, 1],
          answers: [
            {
              text: "唐僧",
              aId: 0
            },
            {
              text: "白龙马",
              aId: 1
            },
            {
              text: "樱桃小丸子",
              aId: 2
            }
          ]
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      list: this.data["list" + options.id]
    });
  },
  submitAnswer() {
    wx.showModal({
      title: "提示",
      content: "确定要提交吗",
      cancelText: "取消",
      confirmText: "确定",
      success: result => {
        if (result.confirm) {
          wx.showToast({
            title: "您已提交！"
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1200);
        }
      }
    });
  }
});
