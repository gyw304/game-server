const WebSocket = require('ws');
const client = new WebSocket('ws://localhost:6080');

var data = {
	'uname' : 'guanyuwei'
}

client.on("open",()=>{
	console.log("connect success")
	client.send(JSON.stringify(data))
})


