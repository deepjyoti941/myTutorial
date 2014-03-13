var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

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
  	username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function(err, collection){
  	if(collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, '123');
  		User.create({firstname:'deepjyoti',lastname:'khakhlary', username:'deepjyoti941',salt:salt, hashed_pwd:hash, roles:['admin'] });
  		salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, '456');
      User.create({firstname:'deep', lastname:'khakhlary', username:'deep88',salt:salt, hashed_pwd:hash, roles:[]});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, '789');
      User.create({firstname:'upasana', lastname:'khakhlary', username:'upasana89',salt:salt, hashed_pwd:hash});
  	}
  });  
 }




