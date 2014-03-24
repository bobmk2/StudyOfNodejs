/*
 * GET home page.
 */

var users = require('../models/users.js');
var stories = require('../models/stories.js');


exports.index = function (req, res) {
	//res.render('index', { title: 'Express', world: 'Express World ;)' });
	console.log( "start index" );

	var pageNum = Number(req.query.page) || 1;
	var count = 10;
	var from = count * ( pageNum - 1 );

	stories.getLatest(count + 1, from, function (err, items) {
		if (err) {
			res.send(500);
			console.log('cannnot retrive stories');
			console.log(err);
			return;
		}

		// 次ページがあるかどうか
		// TODO 実装的にどうなの？
		var nextPage = null;
		if (items.length > count) {
			nextPage = '/?page=' + ( pageNum + 1 );
			items.pop();
		}

		// from に値が入っていれば前ページがある
		var previousPage = null;
		if ( from > 0 ) {
			if ( pageNum == 2 ) {
				previousPage = '/';
			}else {
				previousPage = '/?page=' + ( pageNum - 1 );
			}
		}


		user = null;
		if ( req.session && req.session.user ) {
			user = req.session.user;
		}

		// テンプレートに与えるパラメータを用意する
		var params = {
			page: {
				title: "nblog",
				next: nextPage,
				previous: previousPage
			},
			user: user,
			stories: items,
			request: req
		};
		res.render( 'index', params );
		console.log( "render index finisihed" );

	});

};

// ログイン処理を行う
exports.login = function ( req, res ) {
	res.render( 'login', {
		page: {title: 'login'},
		user: null,
		name: '',
		error: 200,
		loginFailed: false
	} );
	return;
};

// ログインフォームを処理する
exports.login.post = function( req, res ) {
	var name = req.body.name || '';
	var password = req.body.password || '';
	function authCallback( err, userInfo ) {
		if ( err || userInfo === null ) {
			// 認証に失敗
			res.render('login', {
				page: { title:'login' },
				user: null,
				name: name,
				error: 200,
				loginFailed: true
			});
			return;
		}

		// 認証に成功

		req.session.user = {
			uid: userInfo.uid,
			name: userInfo.name
		};
		res.redirect('/');
		return;
	};

	users.authenticate( name, password, authCallback );
};


// ログアウトを行なう
exports.logout = function( req, res ) {
	req.session.destroy( function(err) {
		res.redirect( '/' );
	} );
};

// 記事の作成
exports.create = function( req, res ) {
	if ( req.session.user == undefined ) {
		res.redirect( '/login' );
		return;
	}
	res.render('create', {
		story:{},
		page: { title: 'New Story'},
		user: req.session.user,
		error: 200
	});
};

// 記事の作成フォームを受け付ける
exports.create.post = function( req, res ) {
	if ( req.session.user == undefined ) {
		res.redirect( 403, '/' );
		return;
	}

	var story = {};
	story.title = req.body.title;
	story.slug = req.body.slug;
	story.body = req.body.body;

	stories.insert( story, function(err) {
		if (err) {
			res.send(500);
			return;
		}
		res.redirect('/');
	} );
};

// 単一記事の表示
exports.single = function( req, res ) {
	stories.getBySlug( req.param.slug, function ( err, item ) {
		if ( err ) {
			res.send(500);
			console.log('cannot retrive stories');
			console.log( err );
			return;
		}
		if ( item === null ) {
			res.send(404);
			return;
		}

		console.log( req.session );

		user = req.session.user || null;

		res.render('single', {
			page: { title: 'nblog'},
			user: user,
			story: item
		})
	});
}