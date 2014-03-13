var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

  //creating schema for users
  var userSchema = mongoose.Schema({
  	firstname: {type:String, required:'{PATH} is required'},
  	lastname: {type:String, required:'{PATH} is required'},
  	username: {
  		type: String,
  		required: '{PATH} is required',
  		unique: true
  	},
    salt: {type:String, required:'{PATH} is required'},
    hashed_pwd: {type:String, required:'{PATH} is required'},
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  
  var User = mongoose.model('User', userSchema);

  function createDefaultUsers() {
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
};

exports.createDefaultUsers = createDefaultUsers;
