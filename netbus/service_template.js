
/* 
	service_id : 服务id,
	service_name : 服务名称
 */

var log = require("../utils/log")

var service = {
	service_id : 1,
	service_name : '服务1',
	init : () => {
		log.info(`${this.name} service init`)
	},
	player_recv_data : (session) => {
		log.info(`${this.name} service player_recv_data`)
		// var _data = JSON.parse(data)
		// log.info(`received_data：${data},type:${typeof(_data)}`)
	}，
	player_disconnet : (session) => {
		log.info(`${this.name} service player_disconnet at ${session.session_key}`)
	}
	
}

module.exports = service;