angular.module('services', [])

.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/user/signin',
      data: user
    })
    .then(function (response) {
      return response.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/user/signup',
      data: user
    })
    .then(function (response) {
      return response.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.mvp');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.mvp');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('List', function ($http, $location, $window) {

  var postSpace = function (space) {
    return $http({
      method: 'POST',
      url: '/api/listing',
      data: space
    });
  };

  var getList = function() {
    return $http({
      method: 'GET',
      url: '/api/listing'
    })
    .then(function (response) {
      return response.data;
    });
  };
  return {
    postSpace: postSpace,
    getList: getList
  };

});
