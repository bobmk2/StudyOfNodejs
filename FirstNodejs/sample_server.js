/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:13
 */

var http = require('http');

var server = http.createServer();
server.on('request', function (request, response){
	response.writeHead(200);
	response.write('Method:' + request.method + "\n");
	Object.keys(request.headers).forEach( function (key) {
		response.write(key + ': ' + request.headers[key] + '\n');
	});

	response.end();
});

server.listen(8080, 'localhost');