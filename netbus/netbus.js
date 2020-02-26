var log = require("../utils/log");

var ws  = require("ws");

var global_session_list = {};
var global_session_key = 1;

var netbus = {
	start_ws_server : (ip,port) => {
		var ws_server = new ws.Server({
			host : ip,
			port : port
		})
		ws_server.on("connection",(session) => {
			
			global_session_list[global_session_key] = session;
			global_session_key = global_session_key;
			global_session_key++;
			
			log.info(`session comming`)

			
			session.on("close",(session)=>{
				log.warn(`session 断开连接`)
			})
			session.on("error",(err)=>{
				log.error(`session 出错`,err)
			})
			session.on("message",(data)=>{
				log.info(`接收到信息:${data}`)
			})
		})
		
		ws_server.on("error",(err) => {
			log.error(`ws_server ${err}`)
		})
		
		ws_server.on("close",(client) => {
			log.error(`ws_server close ${err}`)
		})
	}
}


module.exports = netbus;