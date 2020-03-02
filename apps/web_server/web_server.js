var log = require("../../utils/log.js")

var express = require("express");

if(process.argv.length < 3){
	console.log("node web_server.js port");
	return
}

var app = express();
var port = parseInt(process.argv[2]);
var path = require("path");
process.chdir("./apps/web_server")

log.info(path.join(process.cwd(),"www"))

app.use(express.static(path.join(process.cwd(),"www")));

app.listen(port)

log.info(`web_server started at port ${port}`)
