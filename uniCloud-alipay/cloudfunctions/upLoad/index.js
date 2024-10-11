'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
    let {detail} = event;
   return await	db.collection("yuyue").doc(detail._id).update({
		filesUrl:detail.filesUrl
	})
};
