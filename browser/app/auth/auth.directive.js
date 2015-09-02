app.directive('authentication', function(Auth) {
    return {
        restrict: 'AE',
        scope: {
            loginOrSignup: "@"
        },
        link: function($scope) {
            $scope.user = {
                email: null,
                password: null
            };
            $scope.funcToDo = Auth[$scope.loginOrSignup];
        },
        templateUrl: '/browser/app/auth/auth.html'
    };
});
