/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:50
 */
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var crypto = require('crypto');

function start( route , handle)
{
	function onRequest( request, response)
	{
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");
		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8080);
	console.log('Server has started');

}

exports.start = start;