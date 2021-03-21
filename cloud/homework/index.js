// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, openid } = event;
  if (type === "teacherAddHomework") {
    const {
      roomId,
      name,
      members,
      homeworkType,
      homeworkText,
      homeworkImgId,
      homeworkFileId
    } = event;
    return db.collection("homework").add({
      data: {
        roomId,
        name,
        members,
        homeworkType,
        homeworkText,
        homeworkImgId,
        homeworkFileId,
        owner: openid
      }
    });
  } else if (type === "getStudentHomeworkList") {
    return db
      .collection("homework")
      .where({
        members: { openid }
      })
      .get();
  } else if (type === "getHomeworkDetail") {
    const { _id } = event;
    return db
      .collection("homework")
      .doc(_id)
      .get();
  }
};
