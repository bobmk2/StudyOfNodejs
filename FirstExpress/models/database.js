/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 14/03/13
 * Time: 2:34
 */

var mysql = require('mysql');
var config = require('../config.json');

var Database = function(){};

// データベースの認証情報を格納
Database.prototype.dbAuth = config.databaseAuth;

// MySQLクライアントオブジェクトの作成
Database.prototype._getClient = function() {
	if ( this.client === undefined ) {
		this.client = mysql.createConnection(this.dbAuth);
	}
	return this.client;
};

// クエリを実行する
Database.prototype.query = function (query, params, callback) {
	var client = this._getClient();
	return client.query(query, params, callback);
};

// クエリを終了する
Database.prototype.end = function ( callback ) {
	if ( this.client ) {
		this.client.end( callback );
		delete this.client;
	}
};

// Databaseクラスのインスタンスを作成する
function createClient() {
	return new Database();
}

exports.createClient = createClient;