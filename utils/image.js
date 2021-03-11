const app = getApp();

export const ali = (url, w = 375) => {
  if (!url || /^\s+$/.test(url)) {
    return "";
  }

  if (/https?:\/\/oss.xzintl.com/.test(url)) {
    return url;
  }

  // 如果图片链接中已经包含了过滤参数，则直接跳过
  if (/x-oss-process=/.test(url)) {
    return url;
  }

  let dpr = app.globalData.systemInfo.devicePixelRatio;

  // dpr不能小于2，否则图片会太模糊
  dpr = Math.max(dpr, 2);

  if (url.indexOf("?") > -1) {
    url += "&";
  } else {
    url += "?";
  }

  //gif
  if (/\.gif/i.test(url)) {
    url += "x-oss-process=image/resize,w_" + parseInt(w * dpr);
  } else if (/\.png/i.test(url)) {
    url +=
      "x-oss-process=image/format,png/interlace,1,image/resize,w_" +
      parseInt(w * dpr);
  } else {
    url +=
      "x-oss-process=image/format,jpg/interlace,1,image/resize,w_" +
      parseInt(w * dpr);
  }
  // 新增sharpen锐化参数，减少图片缩放后的模糊效果
  url += "/quality,Q_60/sharpen,90";

  return url;
};
