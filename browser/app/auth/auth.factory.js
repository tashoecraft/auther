app.factory('Auth', function($http) {
  return {
    login: function(user) {
      $http.post('/users/login', user).then(function(response) {
        return response.data;
      }).then(null, console.error);
    },
    signup: function(user) {
      $http.post('/users', user).then(function(response) {
        return response.data;
      }).then(null, console.error);
    }
  };

});
