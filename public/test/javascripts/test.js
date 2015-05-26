(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("test/test-helpers", function(exports, require, module) {
var chai, sinonChai;

chai = require('chai');

sinonChai = require('sinon-chai');

chai.use(sinonChai);

module.exports = {
  expect: chai.expect,
  sinon: require('sinon')
};

});

require.register("test/views/header-test", function(exports, require, module) {
var HeaderView, HeaderViewTest, mediator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HeaderView = require('views/header');

mediator = require('mediator');

HeaderViewTest = (function(superClass) {
  extend(HeaderViewTest, superClass);

  function HeaderViewTest() {
    return HeaderViewTest.__super__.constructor.apply(this, arguments);
  }

  HeaderViewTest.prototype.renderTimes = 0;

  HeaderViewTest.prototype.render = function() {
    HeaderViewTest.__super__.render.apply(this, arguments);
    return this.renderTimes += 1;
  };

  return HeaderViewTest;

})(HeaderView);

describe('HeaderView', function() {
  beforeEach(function() {
    return this.view = new HeaderViewTest;
  });
  afterEach(function() {
    return this.view.dispose();
  });
  return it('should display 5 links', function() {
    return expect(this.view.$el.find('a')).to.have.length(5);
  });
});

});

require.register("test/views/main-test", function(exports, require, module) {
var MainView;

MainView = require('views/main');

describe('MainView', function() {
  beforeEach(function() {
    return this.view = new MainView;
  });
  afterEach(function() {
    return this.view.dispose();
  });
  return it('should auto-render', function() {
    return expect(this.view.$el.find('img')).to.have.length(1);
  });
});

});


//# sourceMappingURL=test.js.map