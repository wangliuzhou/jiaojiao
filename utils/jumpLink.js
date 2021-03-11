import { SysPage } from "../constant/index";

const isTabUrl = (url) => {
  return [
    "pages/index/index",
    "pages/classify/index",
    "pages/userCenter/index",
  ].some((item) => {
    return url.indexOf(item) > -1;
  });
};

export default function jumpLink(link) {
  if (!link || link.linkType == null) return;
  let { linkType, linkId, linkJump, productIds } = link;
  switch (linkType) {
    case 0:
      // 0: '功能页面',
      linkJump = SysPage[linkId];
      if (!linkJump) return;
      if (isTabUrl(linkJump)) {
        wx.switchTab({
          url: linkJump,
        });
      } else {
        wx.navigateTo({
          url: linkJump,
        });
      }
      break;
    case 1:
      // 1: '创作页面',
      wx.navigateTo({
        url: `/pages/microPage/index?id=${linkId}`,
      });
      break;
    case 2:
      //商品组
      if(linkId){
        wx.navigateTo({
          url: `/pages/goodsGroup/index?productGroupId=${linkId}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/goodsGroup/index?productIds=${productIds.join(",")}`,
        });
      }
      break;
    case 3:
      //前台类目
      wx.navigateTo({
        url: `/pages/goodsGroup/index?frontCateOutId=${linkId}`,
      });
      break;
    case 4:
      // 4: '商品详情',
      wx.navigateTo({
        url: `/pages/goodsDetail/index?id=${linkId}`,
      });
      break;
    case 5:
      //自定义链接
      break;
  }
}
