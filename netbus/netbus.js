var log = require("../utils/log");
var ws  = require("ws");
var service_manage = require("./service_manage");

var global_session_list = {};
var global_session_key = 1;

var netbus = {
	start_ws_server : (ip,port) => {
		var ws_server = new ws.Server({
			host : ip,
			port : port
		})
		
		log.info("start websocket server at", ip, port);
		
		ws_server.on("connection",(session) => {
			
			log.info(`session comming`)
			
			global_session_list[global_session_key] = session;
			session.session_key = global_session_key;
			global_session_key ++;
			
			session.fire = fire;
			
			session.on("close",()=>{
				
				service_manage.disconnect(session)
				
				if (global_session_list[session.session_key]) {
					global_session_list[session.session_key] = null;
					delete global_session_list[session.session_key]; // 把这个key, value从 {}里面删除
					session.session_key = null;
				}

				
			})
			session.on("error",(err)=>{
				log.error(`session 出错`,err)
			})
			session.on("message",(data)=>{
				service_manage.received_data(session,data);
			})
		})
		
		ws_server.on("error",(err) => {
			log.error(`ws_server ${err}`);
			session.send('服务器崩溃')
		})
		
		ws_server.on("close",(client) => {
			log.error(`ws_server close ${err}`)
			session.send('服务器崩溃')
		})
	},
	
	session_close : (session) => {
		session.close()
	}
}


function fire(cmd){
	this.send(cmd)
}


module.exports = netbus;