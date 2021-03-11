import { get, post } from "../../utils/request";
const loginBehavior = require("../../behaviors/login");
const computedBehavior = require("miniprogram-computed");
Component({
  behaviors: [loginBehavior, computedBehavior],
  data: {
    orderList: [
      {
        icon: "/assets/image/order/payment.png",
        link: "/pages/orderList/index",
        label: "待付款",
        activeIndex: 1
      },
      {
        icon: "/assets/image/order/send.png",
        link: "/pages/orderList/index",
        label: "待发货",
        activeIndex: 2
      }
    ]
  },
  pageLifetimes: {
    show() {
      this._init();
    }
  },
  methods: {
    _init() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        });
      }
      if (this.data.$state.isLogin) {
        // 接口获取数据
      }
    },
    onPageScroll({ scrollTop }) {
      this.setData({
        scrollTop
      });
    },
    // 登录回调
    loginCallback() {
      this.getMemberDetail();
      this.getOrderNum();
    }
  }
});
