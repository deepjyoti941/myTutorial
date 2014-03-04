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
  	firstname: String,
  	lastname: String,
  	username: String
  });

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection){
  	if(collection.length === 0) {
  		User.create({firstname:'deepjyoti',lastname:'khakhlary', username:'deepjyoti941',});
  		User.create({firstname:'deep', lastname:'khakhlary', username:'deep88'});
  	}
  })  
 }
 