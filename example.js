'use strict';

var inject = require('./koa-inject');
var koa = require('koa');
var Router = require('koa-router');
var router = new Router();
var app = koa();

var injector = inject.init(app, {
  'db': {
    a: 6
  },
  'db2': {
    b: 7
  }
});

injector.set('User', {
  name: 'User'
});

app.use(router.middleware());

router.get('/', inject(function * (db, db2, User) {
  this.body = [
    User,
    db
  ];
}));

app.listen(3031);