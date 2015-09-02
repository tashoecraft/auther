'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/auth/signup/signup.html',
		controller: 'signup'
	});
});
