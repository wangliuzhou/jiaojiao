import { get } from "../../utils/request";
const computedBehavior = require("miniprogram-computed");
const loginBehavior = require("../../behaviors/login");

Component({
  behaviors: [computedBehavior, loginBehavior],
  data: {
    scrollTop: 0,
    components: [],
    test: ""
  },
  computed: {
    pageConfig(data) {
      let { components } = data;
      if (components && components[0] && components[0].type == "config") {
        return components[0];
      }
      return null;
    }
  },
  pageLifetimes: {},
  methods: {
    onLoad() {
      this.loadData();
    },
    loadData() {
      wx.showLoading({
        title: "加载中"
      });
      return get("/store/mobile/tenantPage/findMainPage")
        .then(() => {
          this.setData({ test: "test2222" });
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.setData({ test: "test3333" });
          wx.hideLoading();
        });
    },
    // 下拉刷新重新加载数据
    onPullDownRefresh() {
      this.loadData().then(() => {
        wx.stopPullDownRefresh();
      });
    }
  }
});
