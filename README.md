# koa-inject
Inject dependencies into koa apps easily. 

## Example

```js
'use strict';

var koa = require('koa');
var Router = require('koa-router');
var inject = require('koa-inject');

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
```

## API Documentation

#### `inject(*function)`
Injects dependencies into generator function from **koa application context**. Returns a new generator function.

```js
var Router = require('koa-router');
var inject = require('koa-inject');
var router = new Router();

module.exports = router.middleware();

router.get('/', inject(function * (deps...) {
    
}));
```

#### `inject.init(app, [modules]) : Injector`
Initializes dependency injection into koa app. Returns an instance of [simple-injector](https://github.com/poying/simple-injector) `Injector`.

```js
var koa = require('koa');
var inject = require('koa-inject');
var app = koa();
var injector = inject.init(app);
```

## Tests

```bash
$ npm test
```


## Inspired by 
[poying/simple-injector](https://github.com/poying/simple-injector)
[poying/koa-simple-di](https://github.com/poying/koa-simple-di)
