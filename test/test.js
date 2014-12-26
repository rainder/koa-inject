'use strict';

var chai = require('chai');
var co = require('co');
var expect = chai.expect;
var inject = require('./../koa-inject');

describe('koa-inject', function () {
  var app, injector;

  beforeEach(function () {
    app = {
      context: {}
    };

    injector = inject.init(app);
  });

  it('should register', function () {

    injector.set('TestService', function () {
      return 123;
    });

    var a = injector.get('TestService');
    expect(a).to.be.equal(123);
  });

  it('should parse params', function (done) {
    co(function * () {
      var gen;
      injector.set('db', {});

      gen = inject(function *() {
      });
      yield co(gen.call(app, null));

      gen = inject(function * $inSdex9_ () {});
      yield co(gen.call(app, null));


      gen = inject(function *(db, next) {
      });
      yield co(gen.call(app, null));


      expect(function () {
        gen = inject(function (undefinedService) {});
      }).throw();
      yield co(gen.call(app, null));

    }).then(done, done);
  });

  it('should inject deps', function (done) {
    co(function * () {

      var _db = {};
      var _db2 = {};
      var _ctx = app;
      var _next = 9;
      injector.set('db', _db);
      injector.set('db2', _db2);

      var gen = inject(function * (db, db2, next) {
        expect(db).to.be.equal(_db);
        expect(db2).to.be.equal(_db2);
        expect(next).to.be.equal(_next);
        expect(this).to.be.equal(_ctx);
        done();
      });

      co(gen.call(_ctx, _next)).then(null, done);

    });
  });

});