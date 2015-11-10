var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var salt_factor = 10;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  salt: String

});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (error, isMatch) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(salt_factor, function (error, salt) {
    if (error) {
      return next(error);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (error, hash) {
      if (error) {
        return next(error);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('users', UserSchema);
