var log = require("../utils/log")
/* 
	register_service : 注册服务
	disconnect : 玩家断开连接
	received_data : 收到数据
 */

var service_modules = {};

var service_manage = {
	
	register_service : (service_id,service) => {
		if(service_modules[service_id]){
			log.warn(`${service_modules}service is registerd`)
		}
		service_modules[service_id] = service;
		service.init()
	},
	
	disconnect : (session) => {
		for(var key in service_modules){
			service_modules[key].player_disconnet()
		}
	},
	received_data : (session,service_id,data)=> {
		
		if(service_modules[service_id]){
			service_modules[service_id].on_rev_data(session,service_id,data)
		}
		
	}
}

module.exports = service_manage;