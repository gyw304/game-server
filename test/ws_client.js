const WebSocket = require('ws');
const client = new WebSocket('ws://localhost:6080');

var cmd = {
	"service_id" : 1,
	"data" : {
		'uname' : 'guanyuwei'
	}
}

client.on("open",()=>{
	client.send(JSON.stringify(cmd))
})

client.on("message",(data)=>{
	console.log(data)
})


