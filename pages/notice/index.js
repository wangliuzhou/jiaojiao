import { get } from "../../utils/request";
import jumpLink from "../../utils/jumpLink";

const computedBehavior = require("miniprogram-computed");
const app = getApp();

Component({
  behaviors: [computedBehavior],
  data: {
    list: []
  },
  computed: {
    noData(data) {
      let { list } = data;
      return !list || !list.length;
    }
  },
  lifetimes: {
    attached() {
      this.loadData();
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        });
      }
    }
  },
  methods: {
    loadData() {
      wx.showLoading({
        title: "加载中"
      });
      return get("/store/mobile/tenantPage/findSysPage?sysType=3")
        .then(({ data: list }) => {
          this.setData({
            list
          });
        })
        .catch(() => {})
        .then(() => {
          wx.hideLoading();
        });
    },

    onPullDownRefresh() {
      this.loadData().then(() => {
        wx.stopPullDownRefresh();
      });
    }
  }
});
