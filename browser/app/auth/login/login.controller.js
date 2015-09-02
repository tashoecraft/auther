app.controller('login', function($scope) {
  $scope.user = {
    email: null,
    password: null
  };

  $scope.loginOrSignUp = Auth.login;

});
