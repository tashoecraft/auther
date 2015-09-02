app.controller('signup', function($scope) {

  $scope.user = {
    email: null,
    password: null
  };

  $scope.signup = function() {
    console.log($scope.user);
  };

});
