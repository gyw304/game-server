const WebSocket = require('ws');
const client = new WebSocket('ws://localhost:6080');

var cmd = {
	"service_id" : 2,
	"data" : {
		'uname' : 'guanyuwei'
	}
}

client.on("open",()=>{
	client.send(JSON.stringify(cmd))
})


