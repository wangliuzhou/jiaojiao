Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // loading样式
    showLoading: {
      type: Boolean,
      value: false
    },
    // 展示我是有底线的文字
    showNoMoreData: {
      type: Boolean,
      value: false
    }
  },
  data: {
    a: "a"
  },
  /**
   * 组件的方法列表
   */
  methods: {},
  attached: function() {},
  ready: function() {}
});
