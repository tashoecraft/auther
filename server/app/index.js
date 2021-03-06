'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');

app.use(session({
  secret: 'tongiscool'
}));

app.use(require('./logging.middleware'));

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use(function(req, res, next) {
  if (req.session.userId) {
    console.log(req.session);
  }
  else {
  	console.log('User is not logged in.');
  }
  next();
});


app.use('/api', require('../api/api.router'));
app.use('/auth', require('../auth/auth.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id',
  '/users/:id', '/signup', '/login'
];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function(stateRoute) {
  app.get(stateRoute, function(req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));



module.exports = app;
