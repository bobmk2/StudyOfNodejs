/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 14/03/23
 * Time: 21:32
 */
var crypto = require('crypto');
var database = require('./database');
var db = database.createClient();
var users = exports;

// 認証を行う
users.authenticate = function (name, password, callback) {
	db.query('SELECT * FROM users WHERE name = ?',
		[name,], queryCallback);
	function queryCallback(err, results, fields) {
		db.end();
		if (err) {
			callback(err);
			return;
		}
		if (results && (results.length > 0)) {
			userInfo = results[0];
			if (userInfo.password == _hashPassword(password)) {
				delete userInfo.password;
				callback(null, userInfo);
				return;
			}
		}
		// 該当ユーザー無し
		callback(err, null);
		return;
	}
}

// パスワードのハッシュを作成する
function _hashPassword(password) {
	if (password === '') {
		return '';
	}
	var shasum = crypto.createHash('sha256');
	shasum.update(password);
	return shasum.digest('hex');
}

// ユーザーを作成する
users.createUser = function (name, password, callback) {
	var hashedPassword = _hashPassword(password);
	db.query(
		'INSERT INTO users '
			+ '(uid,  name, password) '
			+ 'VALUES '
			+ '(NULL, ?,    ?)'
			+ ';',
		[name, hashedPassword],
		function (err, results, fields) {
			db.end();
			var sid = results.insertId;
			if (err) {
				callback(new Error('Insert failed.'));
			}
			callback(null, sid);
		});
}