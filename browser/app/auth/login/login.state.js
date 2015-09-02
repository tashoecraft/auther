'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/auth/login/login.html',
		controller: 'login'
	});
});
