// 删除缓存;
export const del = id => {
  const cartUnCheckedIdMaps = wx.getStorageSync("cartUnCheckedIdMaps") || {};
  delete cartUnCheckedIdMaps[id];
  wx.setStorageSync("cartUnCheckedIdMaps", cartUnCheckedIdMaps);
};

// 批量删除;
export const batchDelete = () => {
  wx.setStorageSync("cartUnCheckedIdMaps", {});
};

// 添加缓存;
export const add = id => {
  const cartUnCheckedIdMaps = wx.getStorageSync("cartUnCheckedIdMaps") || {};
  cartUnCheckedIdMaps[id] = true;
  wx.setStorageSync("cartUnCheckedIdMaps", cartUnCheckedIdMaps);
};

// 批量添加缓存;
export const batchAdd = (ids = []) => {
  const cartUnCheckedIdMaps = {};
  ids.forEach(id => {
    cartUnCheckedIdMaps[id] = true;
  });
  wx.setStorageSync("cartUnCheckedIdMaps", cartUnCheckedIdMaps);
};

// 剔除无用的
export const checkUp = (ids = []) => {
  const cartUnCheckedIdMaps = wx.getStorageSync("cartUnCheckedIdMaps") || {};
  const cartUnCheckedIds = Object.keys(cartUnCheckedIdMaps);
  cartUnCheckedIds.forEach(unCheckedId => {
    const isIncludes = ids.includes(unCheckedId);
    if (!isIncludes) delete cartUnCheckedIdMaps[unCheckedId];
  });
  wx.setStorageSync("cartUnCheckedIdMaps", cartUnCheckedIdMaps);
};
