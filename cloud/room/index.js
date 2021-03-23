// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  // name 课堂、房间名
  const { type, openid, name, roomId } = event;
  if (type === "addRoom") {
    return db.collection("room").add({
      data: {
        members: [openid],
        name,
        occupation: 1,
        owner: openid
      }
    });
  } else if (type === "getTeacherRooms") {
    return db
      .collection("room")
      .where({
        owner: openid
      })
      .get();
  } else if (type === "getStudentRooms") {
    return db.collection("room").get();
  } else if (type === "studentJoinRoom") {
    // 给学生对象加上自己加入过的课堂
    await db
      .collection("users")
      .doc(openid)
      .update({
        data: {
          rooms: _.push([roomId])
        }
      });
    // 找到学生刚点过的课堂，把学生openid加进去
    return db
      .collection("room")
      .doc(roomId)
      .update({
        data: {
          members: _.push([openid])
        }
      });
  } else if (type === "getRoomsDetail") {
    // const { rooms } = event;
    // return db
    //   .collection("room")
    //   .where({
    //     owner: openid
    //   })
    //   .get();
  }
};
