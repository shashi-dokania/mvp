angular.module('listing', [])

.controller('ListingController', function ($scope, $window, $location, List) {
  
  $scope.data = {};
  $scope.getList = function () {
    List.getList()
    .then(function(list) {
      $scope.data.list = list;
    })
    .catch(function (error) {
      console.error('error...', error);
    })
  }
  $scope.getList();
  $scope.list = {};
  $scope.postSpace = function(space) {
    List.postSpace($scope.list)
    .then(function () {
      $location.path('/');
    })
    .catch(function (error) {
      console.error('error...', error);
    });
  };
  // $scope.reset = function() {
  //    var defaultForm = {
  //             address : "",
  //             city : "",
  //             state: "",
  //             zip: "",
  //             startDate : "",
  //             endDate : "",
  //             price: ""
  //         };
  //         $scope.postComments = function(list){
  //             //make the record pristine
  //             $scope.postSpaceForm.$setPristine();
  //             $scope.list = defaultForm;
  //         };
  // };
  // $scope.removeSpace()

});
