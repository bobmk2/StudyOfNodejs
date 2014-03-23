
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MemcachedStore = require('connect-memcached')(express);
var config = require('./config.json');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.cookieParser(config.cookieHash));
app.use(express.session({
	key: 'session',
	store: new MemcachedStore
}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ログインおよびログアウト
//app.get('/login', routes.login);
//app.post('/login', routes.login.post);
//app.get('/logout', routes.logout);

// 記事の作成
//app.get('/create', routes.create);
//app.post('/create', routes.create.post);

// 記事の表示
//app.get('/:slug', routes.single);
app.get('/', routes.index);

// ユーザ一覧の表示
//app.get('/users', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
