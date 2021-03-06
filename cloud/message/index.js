// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const { type, _id, skip } = event;
  if (type === "sendMessage") {
    delete event.type;
    delete event.userInfo;
    return db.collection("message").add({
      data: event
    });
  } else if (type === "getMessage") {
    return db
      .collection("message")
      .where({
        room: _id
      })
      .skip(skip)
      .get();
  } else if (type === "getMessageCount") {
    return db
      .collection("message")
      .where({
        room: _id
      })
      .count();
  }
};
