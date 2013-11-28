/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:50
 */

var fs = require('fs');

function uranai(response) {
	console.log("Uranai start");

	response.writeHead(200, {"Content-Type": "text/html"});
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'Uranai start'
	'</body>' +
	'</html>';
	response.write(body);
	response.end();
}

function image404(response) {
	fs.readFile( './tmp/desert_fox.png', 'binary', function(error, file){
		if(error)
		{
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type" : "image/png"});
			response.write(file, 'binary');
			response.end();
		}
	});
}

exports.uranai = uranai;
exports.image404 = image404;