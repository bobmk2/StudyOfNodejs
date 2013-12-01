/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:50
 */

var fs = require('fs');

function uranai(response, request) {
	console.log("Uranai start");

	if (request.method == 'GET') {
		// GET
		response.writeHead(200, {"Content-Type": "text/html"});

		var htmlHeader = '<!DOCTYPE html>\
		 <html lang="ja">\
		 <head>\
		   <meta charset="utf-8">\
		   <title>ノード占い</title>\
		   <style>\
		     .content {\
		       width: 480px;\
		       text-align: center;\
		       border: 4px solid lightblue;\
		       padding: 4px;\
		       margin: 16px auto;\
		     }\
		     .main-form div {margin-bottom: 4px;}\
		     .result {\
		       display: block;\
		       font-size: 200%;\
		       color: red;\
		       margin: 4px auto;\
		       border: 1px solid;\
		       width: 4em;\
		     }\
		   </style>\
		 </head>\
		 <body>\
		 <div class="content">\
		 <h1>ノード占い</h1>';

		var htmlMainForm = '<div class="main-form">\
			<form method="post" action="/uranai">\
				<div>\
					<label>名前:<input type="text" name="name" size="20"></label>\
				</div>\
				<div>\
					青年月日:\
					<label><input type="text" name="year" size="5">年</label>\
					<label><input type="text" name="month" size="3">月</label>\
					<label><input type="text" name="day" size="3">日</label>\
				</div>\
				<div>\
					性別:\
					<label><input type="radio" name="sex" value="male">男</label>\
					<label><input type="radio" name="sex" value="ｆｅｍａｌｅ">女</label>\
				</div>\
				<input type="submit" value="占う">\
			</form>\
		</div>';

		var htmlFooter = '</div></body></html>';

		response.write(htmlHeader);
		response.write(htmlMainForm);
		response.write(htmlFooter);
		response.end();
	}


}

function image404(response) {
	fs.readFile('./tmp/desert_fox.png', 'binary', function (error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, 'binary');
			response.end();
		}
	});
}

// 「<」「>」「&」をエンティティに変換
function escapeHtmlSpecialChar(html) {
	if (html === undefined) {
		return '';
	} else {
		html = html.replace(/&/g, '&amp;');
		html = html.replace(/</g, '&lt;');
		html = html.replace(/>/g, '&rt;');
		return html;
	}
}


exports.uranai = uranai;
exports.image404 = image404;