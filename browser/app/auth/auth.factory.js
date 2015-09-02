app.factory('Auth', function($http,$rootScope) {
  $rootScope.userStatus = false;

  function login (user) {
      $http.post('/api/users/login', user).then(function(response) {
        $rootScope.userStatus = true;
        return response.data;
      }).then(null, console.error);
    };

  function signup (user) {
      $http.post('/api/users', user).then(function(response) {
        return response.data;
      }).then(null, console.error);
    }

  return {
    login: login,
    signup: signup
  };

});
