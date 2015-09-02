app.factory('Auth', function($http) {
  return {
    login: function(user) {
      console.log(user);
      $http.post('/api/users/login', user).then(function(response) {
        return response.data;
      }).then(null, console.error);
    },
    signup: function(user) {
      $http.post('/api/users', user).then(function(response) {
        return response.data;
      }).then(null, console.error);
    }
  };

});
