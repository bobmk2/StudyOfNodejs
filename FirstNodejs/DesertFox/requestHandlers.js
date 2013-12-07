/**
 * Created with IntelliJ IDEA.
 * User: bob_mk2
 * Date: 13/11/29
 * Time: 1:50
 */

var fs = require('fs');
var querystring = require('querystring');
var crypto = require('crypto');

function uranai(response, request) {
	console.log("Uranai start");

	if (request.method == 'GET') {
		// GET
		response.writeHead(200, {"Content-Type": "text/html"});

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

		response.write(htmlHeader);
		response.write(htmlMainForm);
		response.write(htmlFooter);
		response.end();
	} else if (request.method == 'POST') {
		// POST
		response.writeHead(200, {"Content-Type": "text/html"});

		request.data = '';
		request.on('data', function (chunk) {
			request.data += chunk;
		});
		request.on('end', function () {
			var query = querystring.parse(request.data);

			var seed = query.name + query.year + query.month + query.day + query.sex;
			hash = crypto.createHash('md5');
			hash.update(seed);
			var hashValue = hash.digest('hex');

			var fortuneKey = Number('0x' + hashValue.slice(0, 2));
			var result = '';
			if (fortuneKey < 10) {
				result = '大凶';
			} else if (fortuneKey < 50) {
				result = '凶';
			} else if (fortuneKey < 100) {
				result = '末吉';
			} else if (fortuneKey < 150) {
				result = '吉';
			} else if (fortuneKey < 245) {
				result = '中吉';
			} else {
				result = '大吉';
			}

			var resultStr = '<div><p>'
				+ escapeHtmlSpecialChar(query.year) + '年'
				+ escapeHtmlSpecialChar(query.month) + '月'
				+ escapeHtmlSpecialChar(query.day) + '日生まれの'
				+ escapeHtmlSpecialChar(query.name) + 'さん（'
				+ ((query.sex == 'male') ? '男性' : '女性')
				+ '）の運勢は……'
				+ '<span class="result">'
				+ result + '</span>'
				+ 'です。</p></div>'
				+ '<a href="/">トップに戻る</a>';

			response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
			response.write(htmlHeader);
			response.write(resultStr);
			response.write(htmlFooter);
			response.end();
		});
	}
}

function image404(response) {
	fs.readFile('./tmp/desert_fox.png', 'binary', function (error, file) {
		if (error) {
			console.log('Error : ' + error);
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

var htmlFooter = '</div></body></html>';

exports.uranai = uranai;
exports.image404 = image404;