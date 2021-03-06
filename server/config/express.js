var express = require('express'),
	stylus = require('stylus'), //for static route handling i.e serving static files,css files	
	passport = require('passport');
	
module.exports = function(app, config) {
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}

	app.configure(function(){
		app.set('views' , config.rootPath + '/server/views');
		app.set('view engine', 'jade');
		app.use(express.logger('dev'));
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({secret:'global vision unicorns'}));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(stylus.middleware(
			{
				src: config.rootPath + '/public',
				compile: compile
			}
		));
		app.use(express.static(config.rootPath + '/public')); //serve the file which mathches the requested file with inside public dir

	});

}
