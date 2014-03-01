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

/*choose the database connection stream based on enviroment ..local development or deployed*/
if(env == 'development') {
	//connecting to local development mongodb database and creating mytutorial db
	mongoose.connect('mongodb://localhost/mytutorial');	
}else {
	//connecting to deployment mongodb server i.e mongolab
	mongoose.connect('mongodb://deepjyoti941:mytutorial@ds033569.mongolab.com:33569/mytutorial');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
	console.log('mytutorial db is opened..');
});

//creating schema for db
// var messageSchema = mongoose.Schema({message: String});
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc){
// 	mongoMessage= messageDoc.message;
// });

//pass the mongoMessage to our view index
app.get('*', function(req, res){
	res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' +port+ '....');