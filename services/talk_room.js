/* 
	service_id : 服务id,
	service_name : 服务名称
 */

var log = require("../utils/log")

var command = {
	'enter' : 1,
	'chat' : 2
}

var room = {}


var service = {
	service_id : 2,
	service_name : '聊天室',
	init : () => {
		log.info(`${service.service_name}[id:${service.service_id}] service init`)
	},
	player_recv_data : (session,data) => {
		var _data = JSON.parse(data)
		
		switch(_data.command_id){
			case command.enter :
			log.warn(`用户 ${_data.data.uname} 进入聊天室`);
			
			//保存当前聊天室信息
			room[session.session_key] = {
				session : session,
				uinfo : _data.data
			}
			
			broadcast(command.enter,room)
			
			break;
		}
		
		//log.info(`${service.service_name} received_data：${data},type:${typeof(_data)}`)
	},
	player_disconnet : (session) => {
		
		// for(key in room){
		// 	room[key].session.fire(`${room[session.session_key].uinfo.uname} 离开了聊天室`);
		// }
		
		
		log.info(`${service.service_name} service player_disconnet at ${session.session_key}`)
		
		if(room[session.session_key]){
			delete room[session.session_key];
		}
		
		broadcast(command.enter,room)
		
		console.log(room)

		
	}
}

function broadcast(type,data){
	
	var msg = JSON.stringify({
		type: type,
		data: data
	});
	
	for(key in room){
		room[key].session.fire(msg);
	}
}

module.exports = service;