var router = require('express').Router();

var passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());

var secret = require('./secret.js');
var User = require('../api/users/user.model.js');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
	clientID: secret.clientId,
	clientSecret: secret.clientSecret,
	callbackURL: secret.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({'google.id': profile.id})
			.then(function(user){
				if (user) {
					return done();
				}
				else {
					var newUser = {
						email: profile.emails[0].value,
						'google.email': profile.emails[0].value,
						'google.id': profile.id,
						'google.name': profile.name.givenName +' '+ profile.name.familyName, 
					};
					User.create(newUser).then(function(newUser){return done();});
				}
			})
			.then(null,console.error);
	}
));

router.use(function(req,res,next){
	console.log('in the auth router');
	next();
});

router.get('/google', passport.authenticate('google', { scope : 'email' }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/home',
    failureRedirect : '/'
  }));

module.exports = router;