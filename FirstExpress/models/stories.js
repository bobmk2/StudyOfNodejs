/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 14/03/23
 * Time: 21:31
 */

var database = require( './database' );
var db = database.createClient();
var stories = exports;

stories.insert = function ( story, callback) {
	var params = [
		story.slug,
		story.title,
		story.body
	];
	db.query(
		'INSERT INTO stories '
			+ '(sid,  slug, title, body, cdate) '
			+ 'VALUES '
			+ '(NULL, ?,    ?,     ?,    NOW())'
			+ ';',
		params,
		function (err, results, fields) {
			db.end();
			var sid = results.insertId;
			if (err) {
				callback(new Error('Insert failed.'));
				return;
			}
			callback(null);
		});
}

stories.getBySid = function ( sid, callback ) {
	db.query(
		'SELECT * FROM stories WHERE sid = ?;',
		[sid], function(err, results, fields) {
			db.end();
			if (err) {
				callback(err);
				return;
			}
			if (results && (results.length > 0)) {
				var story = new Story(results[0]);
				callback(null, story);
				return;
			}
			callback(null, null);
		});
}

// slugを指定してデータベースから記事を取得する
stories.getBySlug = function ( slug, callback ) {
	db.query( 'SELECT * FROM stories WHERE slug = ?;',
	[slug], function(err,results,fields) {
			db.end();
			if ( err ) {
				callback(err);
				return;
			}

			if ( results && (results.length > 0) ) {
				callback(null,results[0]);
				return;
			}

			callback(null, null);
		});

}

// 最新n件の記事を取得する
stories.getLatest = function ( count, from, callback ) {
	if ( 'function' === typeof from ) {
		callback = from;
		from = undefined;
	}
	from = from | 0;
	db.query( 'SELECT * FROM stories ORDER BY cdate DESC LIMIT ?, ?;', [from, count],
	function ( err, results, fields ) {
		db.end();
		if (err) {
			callback(err);
			return;
		}
		callback(null, results);
	});
}