/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 14/03/23
 * Time: 21:47
 */
var users = require( '../models/users' );

var name = 'admin';
var password = 'admin';

users.createUser( name, password, function (err, sid) {
	if (err) {
		console.log('user creation failed.');
	}
	console.log( 'user ' + name + ' created. sid: ' + sid )
} );