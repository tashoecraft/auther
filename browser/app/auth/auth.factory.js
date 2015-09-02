app.factory('Auth', function($http, $rootScope) {
  function login(user) {
    $http.post('/api/users/login', user).then(function(response) {
      $rootScope.user = user;
      return response.data;
    }).then(null, console.error);
  };

  function signup(user) {
    $http.post('/api/users', user).then(function(response) {
      return response.data;
    }).then(null, console.error);
  }

  function refreshMe() {
    $http.get('/api/users/auth/me').then(function(response) {
      $rootScope.user = response.data;
    });
  }

  return {
    login: login,
    signup: signup,
    refreshMe: refreshMe
  };

});
