/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:45
 */


var server = require('./server.js');
var router = require('./router.js');
var requestHandlers = require('./requestHandlers.js');

var handle = {};
handle["/uranai"] = requestHandlers.uranai;
handle["/404.png"] = requestHandlers.image404;

server.start(router.route, handle);

