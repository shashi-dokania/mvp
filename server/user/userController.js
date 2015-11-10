var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
//signin
//signup
//signin authorization

module.exports = {

  signin: function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;
    console.log('username...', username);
    console.log('password...', password);

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                response.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;
    console.log('username...', username);
    console.log('password...', password);

    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        response.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuthorization: function (request, response, next) {
    var token = request.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            response.send(200);
          } else {
            response.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};

