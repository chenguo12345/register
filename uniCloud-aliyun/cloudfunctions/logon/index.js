'use strict';
const db = uniCloud.database() 
exports.main = async (event, context) => {
	const collection = db.collection("User")
	let data = await collection.add([	//集合中添加一个对象数组
		event
		])
		console.log('数据插入：')
		console.log(JSON.stringify(data))
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return {
		code: 1,
		msg: '',
		data:event
	}
};
