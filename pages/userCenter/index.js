import { get, post } from "../../utils/request";
import Cfg from "../../configs/index";
const loginBehavior = require("../../behaviors/login");
const computedBehavior = require("miniprogram-computed");
const app = getApp();
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
        this.getMemberDetail();
        this.getOrderNum();
      }
    },
    onPageScroll({ scrollTop }) {
      this.setData({
        scrollTop
      });
    },
    goPage(e) {
      const { activeIndex, link } = e.currentTarget.dataset;
      if (link === "/pages/orderList/index") {
        wx.navigateTo({
          url: `${link}?activeIndex=${activeIndex}`
        });
      } else {
        wx.navigateTo({
          url: `${link}`
        });
      }
    },
    goMember() {
      const { isMmember } = this.data;
      if (isMmember === 0) {
        wx.showToast({ title: "商家未设置会员", icon: "none" });
        return;
      }
      wx.navigateTo({
        url: "/pages/membersCenter/index"
      });
    },
    // 获取会员卡详情
    async getMemberDetail() {
      const { storeOuterId } = this.data;
      const { data } = await get(
        "/client/mobile/tenantMemberCardOption/isMemberCard",
        {
          storeOuterId
        }
      );
      this.setData({ isMmember: data });
    },
    // 订单数量
    async getOrderNum() {
      const { storeOuterId } = this.data;
      const { data } = await get("/order/mobile/tenantOrder/findOrderCount", {
        storeOuterId
      });
      let { orderList } = this.data;
      orderList[0].num = data["stayPayment"];
      orderList[1].num = data["stayShipments"];
      orderList[2].num = data["stayReceiving"];
      orderList[3].num = data["evaluate"];
      orderList[4].num = data["afterSale"];
      this.setData({ orderList: orderList });
    },
    // 登录回调
    loginCallback() {
      this.getMemberDetail();
      this.getOrderNum();
    }
  }
});
