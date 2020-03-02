var log = require("../utils/log")
var search_key = require("../utils/search_key")
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
			return
		}
		service_modules[service_id] = service;
		
		service.init()
	},
	
	disconnect : (session) => {
		for(var key in service_modules){
			service_modules[key].player_disconnet(session)
		}
	},
	received_data : (session,data)=> {
		
		if(service_modules[JSON.parse(data).service_id]){
			service_modules[JSON.parse(data).service_id].player_recv_data(session,data)
		}else{
			log.warn(`该数据未找到相应服务`)
		}
		
	}
}

module.exports = service_manage;