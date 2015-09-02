app.controller('login', function($scope) {
  $scope.user = {
    email: null,
    password: null
  };

  $scope.login = function() {
    console.log($scope.user);
  }

});
