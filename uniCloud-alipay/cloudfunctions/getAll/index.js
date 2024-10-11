'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
   let {skip=0} = event;
   return await db.collection("yuyue").limit(8).skip(skip).orderBy("postTime","desc").get();//按时间顺序排列
};
