app.controller('login', function($scope,Auth) {
  $scope.user = {
    email: null,
    password: null
  };

  $scope.loginOrSignUp = Auth.login;

});
