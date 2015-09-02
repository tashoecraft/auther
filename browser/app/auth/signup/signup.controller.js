app.controller('signup', function($scope, Auth) {

  $scope.user = {
    email: null,
    password: null
  };

  $scope.signup = Auth.signup;

});
