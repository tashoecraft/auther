// 'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
//var session = require('express-session');

router.param('id', function(req, res, next, id) {
	User.findById(id).exec()
		.then(function(user) {
			if (!user) throw HttpError(404);
			req.requestedUser = user;
			next();
		})
		.then(null, next);
});

router.get('/', function(req, res, next) {
	User.find({}).exec()
		.then(function(users) {
			res.json(users);
		})
		.then(null, next);
});

router.post('/login', function(req, res, next) {
	User.find({
			email: req.body.email,
			password: req.body.password
		})
		.then(function(user) {
			if (user.length) {
				req.session.userId = user[0]._id;
				res.status(200).json(user);
			} else {
				res.status(401).send();
			}
		});
});

router.post('/', function(req, res, next) {
	User.create(req.body)
		.then(function(user) {
			res.status(201).json(user);
		})
		.then(null, next);
});

router.get('/auth/me', function(req, res, next) {
	if (req.session.userId || req.session.passport) {
		var id = req.session.userId || req.session.passport.user._id;
		User.findById(id).then(function(user) {
			res.json(user);
		}).then(null, console.error);		
	}
	else {
		res.json({});
	}
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

router.get('/:id', function(req, res, next) {
	req.requestedUser.getStories()
		.then(function(stories) {
			var obj = req.requestedUser.toObject();
			obj.stories = stories;
			res.json(obj);
		})
		.then(null, next);
});

router.put('/:id', function(req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
		.then(function(user) {
			res.json(user);
		})
		.then(null, next);
});

router.delete('/:id', function(req, res, next) {
	req.requestedUser.remove()
		.then(function() {
			res.status(204).end();
		})
		.then(null, next);
});



module.exports = router;
