var fs = require('fs');
function test01() {
	fs.readFile('./tmp/test.txt', 'utf8', function (err, data){
		console.log('read');
		console.log(data);
	});
	console.log('foo');
	console.log('bar');
	for ( var i = 0; i < 10000; i++)
	{
		console.log('.');
	}
}

test01();