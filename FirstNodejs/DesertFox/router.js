/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:50
 */

function route(handle, pathname, response, request) {
	console.log('About to route a request for ' + pathname);

	if (typeof handle[pathname] == 'function') {
		// 対応するハドドラー有り
		handle[pathname](response, request);
	} else {
		console.log("No request found for " + pathname);
		response.writeHead(404, {"Content-Type":"text/html"});
		response.write('<html><body><h2>404 Not Found</h2><img src="/404.png" /></body></html>');
		response.end();
	}
}


exports.route = route;