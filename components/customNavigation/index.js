const computedBehavior = require("miniprogram-computed");
const app = getApp();
Component({
	behaviors: [computedBehavior],
	properties: {
		title: {
			type: String,
			value: "标题",
		},
		home: {
			type: Boolean,
			value: false,
		},
		back: {
			type: Boolean,
			value: false,
		},
		block: {
			type: Boolean,
			value: false,
		},
		scrollTop: {
			type: Number,
			value: 0,
		},
	},
	data: {
		statusBarHeight: app.globalData.statusBarHeight,
		pageLength: 1,
	},
	pageLifetimes: {
		show() {
			let pages = getCurrentPages();
			this.setData({ pageLength: pages.length });
		},
	},
	computed: {
		navBarStyle(data) {
			let { scrollTop } = data;
			let opacity = scrollTop / 100;
			opacity = opacity > 1 ? 1 : opacity;
			let num = 255 - 255 * opacity;
			return {
				bgColor: `rgba(255,255,255,${opacity})`,
				textColor: `rgb(${num},${num},${num})`,
			};
		},
	},
	methods: {
		goBack() {
			wx.navigateBack({ delat: 1 });
		},
		goHome() {
			wx.switchTab({ url: "/pages/index/index" });
		},
	},
	onLoad: function () {},
});
