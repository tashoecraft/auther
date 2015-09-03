var router = require('express').Router();

var passport = require('passport');
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
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
					return done(null, user);
				}
				else {
					var newUser = {
						email: profile.emails[0].value,
						'google.email': profile.emails[0].value,
						'google.id': profile.id,
						'google.name': profile.name.givenName +' '+ profile.name.familyName, 
					};
					newUser.save().then(function(newUser){return done(null,newUser);});
				}
			})
			.then(null,console.error);
	}
));

router.use(function(req,res,next){
	next();
});

router.get('/google', passport.authenticate('google', { scope : 'email' }));

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/users'
  }));

module.exports = router;