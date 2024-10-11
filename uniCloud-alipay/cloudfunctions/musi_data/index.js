'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	let {filesUrl,postTime} = event
    db.collection("music").add({
			filesUrl,
			postTime:Date.now()
	})
};
