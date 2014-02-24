var express = require('express'),
	stylus = require('stylus'), //for static route handling i.e serving static files,css files	
	mongoose = require('mongoose');

//creating node enviroment variable
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
	return stylus(str).set('filename', path);
}

app.configure(function(){
	app.set('views' , __dirname + '/server/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(stylus.middleware(
		{
			src: __dirname + '/public',
			compile: compile
		}
	));
	app.use(express.static(__dirname + '/public')); //serve the file which mathches the requested file with inside public dir

});

//serving angular.js partials files
app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/' + req.params.partialPath);
});

mongoose.connect('mongodb://localhost/mytutorial');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
	console.log('mytutorial db is opened..');
});

app.get('*', function(req, res){
	res.render('index');
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' +port+ '....');