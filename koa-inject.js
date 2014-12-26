'use strict';

var Injector = require('simple-injector');

module.exports = exports = Inject;

/**
 *
 * @param app {Application}
 * @param (modules) {{}}
 * @returns {Injector}
 */
Inject.init = function (app, modules) {
  app.di = new Injector();
  app.context.di = app.di;
  if (modules) preLoad(app.di, modules);
  return app.di;
};


/**
 *
 * @param di {Injector}
 * @param modules {{}}
 */
function preLoad(di, modules) {
  Object.keys(modules).forEach(loadModule);

  function loadModule(name) {
    di.set(name, modules[name]);
  }
}

/**
 *
 */
function Inject(gen) {
  var deps;
  var matches = gen.toString().match(/^function *\*[a-zA-Z0-9_\$ ]*\(([^\)]*)/);

  if (!matches) {
    throw new Error('Invalid generator function passed');
  }

  if (!matches[1]) {
    return noop(gen);
  }

  deps = matches[1].split(/, */);

  /**
   *
   */
  return function *(next) {
    var args = deps.map(mapFn, this);
    return yield gen.apply(this, args)

    /**
     *
     * @param dep
     * @returns {*}
     */
    function mapFn(dep) {
      if (dep === 'next') {
        return next;
      }

      return this.di.get(dep);
    }
  };
}

/**
 *
 * @param gen
 * @returns {Function}
 */
function noop(gen) {
  return function * () {
    return gen.apply(this, arguments);
  };
}