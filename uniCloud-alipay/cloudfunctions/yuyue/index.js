'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let {time,name,postTime} = event
   return await  db.collection("yuyue").add({
			time,
			name,
			postTime:Date.now()
	})
};
