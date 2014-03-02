var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/mytutorial',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://deepjyoti941:mytutorial@ds033569.mongolab.com:33569/mytutorial',
		rootPath: rootPath,
		port: process.env.PORT || 80

	}
}