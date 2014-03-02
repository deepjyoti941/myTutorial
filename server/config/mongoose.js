var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    	console.log('mytutorial db opened');
 	});

  //creating schema for users
  var userSchema = mongoose.Schema({
  	firstName: String,
  	lastName: String,
  	userName: String
  });

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection){
  	if(collection.length === 0) {
  		User.create({firstName:'deepjyoti',lastName:'khakhlary', userName:'deepjyoti941'});
  		User.create({firstName:'deep', lastName:'khakhlary', userName:'deep88'});
  	}
  })
 }