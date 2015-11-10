angular.module('authorization', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {

  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.mvp', token);
      $location.path('/listing');
    })
    .catch(function (error) {
      console.error('error', error);
    });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.mvp', token);
      $location.path('/listing');
    })
    .catch(function (error) {
      console.error('error', error);
    });
  };
});
