// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, openid } = event;
  if (type === "teacherAddSign") {
    // members: [
    //   {
    //     openid: "",
    //     status: 0     0代表未签到， 1代表已签到
    //   }
    // ],
    const { roomId, name, members, startTime, endTime } = event;
    return db.collection("sign").add({
      data: {
        roomId,
        name,
        members,
        startTime,
        endTime,
        owner: openid
      }
    });
  } else if (type === "getStudentSignList") {
    return db
      .collection("sign")
      .where({
        openid
      })
      .get();
  } else if (type === "getAllSignList") {
    return db.collection("sign").get();
  } else if (type === "studentSign") {
    // _id 签到id
    // idx 学生在members数组中的位置
    const { _id, idx } = event;
    const temp = "members." + idx + ".status";
    return db
      .collection("sign")
      .doc(_id)
      .update({
        data: {
          [temp]: 1
        }
      });
  }
};
