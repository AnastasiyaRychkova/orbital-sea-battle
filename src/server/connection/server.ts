const express = require('express')
const server = express()

server.get('/', function (req: any, res: any) {
	console.log( req );
	res.send('Hello World')
})

server.listen(3000);

export {
	server,
};