var netbus = require("./netbus.js");
netbus.start_ws_server("127.0.0.1",6080);
var service_manage = require("./service_manage");

//service_manage.register_service(1,require("../services/service_template.js"))

/* 
	参数1 ： 指定服务id
 */
service_manage.register_service(2,require("../services/talk_room.js"))