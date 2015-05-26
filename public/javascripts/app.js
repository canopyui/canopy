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
require.register("application", function(exports, require, module) {
var Application, Chaplin, HeaderController, Layout, mediator, routes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

HeaderController = require('controllers/header');

Layout = require('views/layout');

mediator = require('mediator');

routes = require('routes');

module.exports = Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.title = 'Canopy Vizualizer';

  Application.prototype.initialize = function() {
    Application.__super__.initialize.apply(this, arguments);
    this.initDispatcher({
      controllerSuffix: ''
    });
    this.initLayout();
    this.initMediator();
    this.initComposer();
    this.initControllers();
    this.initRouter(routes);
    return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
  };

  Application.prototype.initLayout = function() {
    return this.layout = new Layout({
      title: this.title
    });
  };

  Application.prototype.initControllers = function() {
    return new HeaderController();
  };

  Application.prototype.initMediator = function() {
    return mediator.seal();
  };

  return Application;

})(Chaplin.Application);

});

require.register("controllers/base/controller", function(exports, require, module) {
var Chaplin, Controller,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  return Controller;

})(Chaplin.Controller);

});

require.register("controllers/header", function(exports, require, module) {
var Controller, HeaderController, HeaderView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

HeaderView = require('views/header');

module.exports = HeaderController = (function(superClass) {
  extend(HeaderController, superClass);

  function HeaderController() {
    return HeaderController.__super__.constructor.apply(this, arguments);
  }

  HeaderController.prototype.initialize = function() {
    HeaderController.__super__.initialize.apply(this, arguments);
    return this.view = new HeaderView();
  };

  return HeaderController;

})(Controller);

});

require.register("controllers/main", function(exports, require, module) {
var Controller, MainController, MainView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

MainView = require('views/main');

module.exports = MainController = (function(superClass) {
  extend(MainController, superClass);

  function MainController() {
    return MainController.__super__.constructor.apply(this, arguments);
  }

  MainController.prototype.index = function() {
    return this.view = new MainView();
  };

  return MainController;

})(Controller);

});

require.register("initialize", function(exports, require, module) {
var Application;

Application = require('application');

$(function() {
  var app;
  app = new Application();
  return app.initialize();
});

});

require.register("lib/canopy/d3/circlepack", function(exports, require, module) {
'use strict';
var CirclePack;

module.exports = CirclePack = (function() {
  function CirclePack() {}

  CirclePack.prototype.render = function(elem, data, options) {
    var format, node, pack;
    if (options == null) {
      options = {};
    }
    options = $.extend({
      width: 600,
      height: 600
    }, options);
    this.width = options.width;
    this.height = options.height;
    format = d3.format(",d");
    pack = d3.layout.pack().size([this.width - 4, this.height - 4]).value(function(d) {
      return d.size;
    });
    this.viz = d3.select(elem).append("svg").attr("width", this.width).attr("height", this.height).attr("class", "pack").append("g").attr("transform", "translate(2, 2)");
    node = this.viz.data([data]).selectAll(elem + " g.node").data(pack.nodes).enter().append("g").attr("class", function(d) {
      if (d.children) {
        return "node";
      } else {
        return "leaf node";
      }
    }).attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
    node.append("title").text(function(d) {
      return d.name + (d.children ? "" : ": " + format(d.size));
    });
    this.circles = node.append("circle").attr("r", function(d) {
      return d.r;
    }).on("click", options.click);
    node.filter(function(d) {
      return d.children;
    }).append("text").attr("text-anchor", "middle").attr("dy", ".3em").text(function(d) {
      if (d.name.length <= d.r / 3) {
        return d.name;
      } else {
        return "";
      }
    });
    return this.circles.attr('r', 0).transition().duration(1000).attr("r", function(d) {
      return d.r;
    });
  };

  CirclePack.prototype.zoom = function(d) {
    var x, y;
    x = d3.scale.linear().range([0, this.width]);
    y = d3.scale.linear().range([0, this.height]);
    return this.circles.transition().duration(750).attr("cx", function(d, i) {
      return d.x - i;
    }).attr("cy", function(d, i) {
      return d.y - i;
    });
  };

  return CirclePack;

})();

});

require.register("lib/canopy/d3/radialtree", function(exports, require, module) {
'use strict';
var RadialTree;

module.exports = RadialTree = (function() {
  function RadialTree() {}

  RadialTree.prototype.render = function(elem, data, options) {
    var diagonal, diameter, height, link, links, node, nodes, svg, tree, width;
    if (options == null) {
      options = {};
    }
    width = options.width;
    height = options.height;
    diameter = options.diameter || Math.min(options.width, options.height);
    tree = d3.layout.tree().size([360, diameter / 2 - 120]).separation(function(a, b) {
      return (a.parent === b.parent ? 1 : 2) / a.depth;
    });
    diagonal = d3.svg.diagonal.radial().projection(function(d) {
      return [d.y, d.x / 180 * Math.PI];
    });
    svg = d3.select(elem).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    nodes = tree.nodes(data);
    links = tree.links(nodes);
    link = svg.selectAll(elem + " .link").data(links).enter().append("path").attr("class", "link").attr("d", diagonal);
    node = svg.selectAll(elem + " .node").data(nodes).enter().append("g").attr("class", "node").attr("transform", function(d) {
      return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
    });
    node.append("circle").attr("r", 4.5);
    node.append("text").attr("dy", ".31em").attr("text-anchor", function(d) {
      if (d.x < 180) {
        return "start";
      } else {
        return "end";
      }
    }).attr("transform", function(d) {
      if (d.x < 180) {
        return "translate(8)";
      } else {
        return "rotate(180)translate(-8)";
      }
    }).text(function(d) {
      return d.name;
    });
    return d3.select(self.frameElement).style("height", diameter - 150 + "px");
  };

  return RadialTree;

})();

});

require.register("lib/canopy/github", function(exports, require, module) {
'use strict';
module.exports = {
  getRepoFromURL: function(url) {
    var m;
    if (m = url.match(/github\.com\/([^\/]+\/[^\/]+)/)) {
      return m[1];
    }
  },
  loadRepo: function(repo, options) {
    var opts, url;
    if (options == null) {
      options = {};
    }
    opts = $.extend({
      sha: 'HEAD',
      recursive: 1
    }, options, {
      repo: repo
    });
    opts.recursive = opts.recursive ? 1 : 0;
    url = "https://api.github.com/repos/" + opts.repo + "/git/trees/" + opts.sha + "?recursive=" + opts.recursive + "&callback=?";
    return $.ajax($.extend({
      url: url,
      dataType: 'jsonp'
    }, opts));
  },
  parse: function(data) {
    var i, len, node, paths, ref;
    paths = {
      root: {
        name: '',
        path: '',
        children: []
      }
    };
    ref = data.tree;
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      if (node.type === 'blob') {
        this.parseBlob(paths, node);
      } else {
        this.parseTree(paths, node);
      }
    }
    return this.collapse(paths);
  },
  parseBlob: function(paths, node) {
    var name, path, segments;
    segments = ("root/" + node.path).match(/(.*)\/(.*)/);
    node.name = segments[2];
    path = segments[1];
    name = path.substr(5);
    paths[path] || (paths[path] = {
      name: name,
      path: node.path,
      children: []
    });
    return paths[path].children.push(node);
  },
  parseTree: function(paths, node) {
    var name, path;
    path = "root/" + node.path;
    name = path.match(/(.*)\/(.*)/)[2];
    paths[path] || (paths[path] = {
      name: name,
      children: []
    });
    return $.extend(paths[path], node);
  },
  collapse: function(paths) {
    var node, parent, path;
    for (path in paths) {
      node = paths[path];
      parent = path.match(/(.*)\//);
      if (!(parent && (parent = parent[1]))) {
        continue;
      }
      paths[parent].children.push(node);
    }
    return paths;
  }
};

});

require.register("lib/canopy/tree", function(exports, require, module) {
'use strict';
module.exports = {
  trim: function(tree, level, extend) {
    var branch, i, len, ref;
    if (level == null) {
      level = 1;
    }
    if (extend == null) {
      extend = true;
    }
    if (extend) {
      tree = $.extend({}, tree);
    }
    if (!tree.children) {
      return tree;
    }
    ref = tree.children;
    for (i = 0, len = ref.length; i < len; i++) {
      branch = ref[i];
      if (!branch.children) {
        continue;
      }
      if (level === 1) {
        branch.size = this.sumSize(branch.children);
        delete branch.children;
      } else {
        this.trimTree(branch, level - 1);
      }
    }
    return tree;
  },
  sum: function(tree) {
    return 0;
  }
};

});

require.register("lib/support", function(exports, require, module) {
var Chaplin, support, utils;

Chaplin = require('chaplin');

utils = require('lib/utils');

support = utils.beget(Chaplin.support);

module.exports = support;

});

require.register("lib/utils", function(exports, require, module) {
var Chaplin, utils;

Chaplin = require('chaplin');

utils = Chaplin.utils.beget(Chaplin.utils);

module.exports = utils;

});

require.register("lib/view-helper", function(exports, require, module) {
var mediator,
  slice = [].slice;

mediator = require('mediator');

Handlebars.registerHelper('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

Handlebars.registerHelper('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

Handlebars.registerHelper('url', function() {
  var i, options, params, routeName, url;
  routeName = arguments[0], params = 3 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []), options = arguments[i++];
  url = null;
  mediator.publish('!router:reverse', routeName, params, function(result) {
    return url = result ? "/" + result : routeName;
  });
  return url;
});

});

require.register("mediator", function(exports, require, module) {
module.exports = require('chaplin').mediator;

});

require.register("models/base/collection", function(exports, require, module) {
var Chaplin, Collection, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

Model = require('models/base/model');

module.exports = Collection = (function(superClass) {
  extend(Collection, superClass);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  Collection.prototype.model = Model;

  return Collection;

})(Chaplin.Collection);

});

require.register("models/base/model", function(exports, require, module) {
var Chaplin, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Model = (function(superClass) {
  extend(Model, superClass);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Chaplin.Model);

});

require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  return match('', 'main#index');
};

});

require.register("views/base/collection-view", function(exports, require, module) {
var Chaplin, CollectionView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

View = require('views/base/view');

module.exports = CollectionView = (function(superClass) {
  extend(CollectionView, superClass);

  function CollectionView() {
    return CollectionView.__super__.constructor.apply(this, arguments);
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);

});

require.register("views/base/view", function(exports, require, module) {
var Chaplin, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

require('lib/view-helper');

module.exports = View = (function(superClass) {
  extend(View, superClass);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);

});

require.register("views/header", function(exports, require, module) {
var HeaderView, View, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

template = require('views/templates/header');

module.exports = HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.className = 'header navbar navbar-fixed-top';

  HeaderView.prototype.container = '#header-container';

  HeaderView.prototype.id = 'header';

  HeaderView.prototype.template = template;

  return HeaderView;

})(View);

});

require.register("views/layout", function(exports, require, module) {
var Chaplin, Layout,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Layout = (function(superClass) {
  extend(Layout, superClass);

  function Layout() {
    return Layout.__super__.constructor.apply(this, arguments);
  }

  return Layout;

})(Chaplin.Layout);

});

require.register("views/main", function(exports, require, module) {
var MainView, View, github, renderers, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

template = require('views/templates/main');

View = require('views/base/view');

github = require('lib/canopy/github');

renderers = {
  circlepack: require('lib/canopy/d3/circlepack'),
  radialtree: require('lib/canopy/d3/radialtree')
};

module.exports = MainView = (function(superClass) {
  extend(MainView, superClass);

  function MainView() {
    this.zoom = bind(this.zoom, this);
    this.loadGitRepo = bind(this.loadGitRepo, this);
    return MainView.__super__.constructor.apply(this, arguments);
  }

  MainView.prototype.autoRender = false;

  MainView.prototype.className = 'main container';

  MainView.prototype.container = '#page-container';

  MainView.prototype.template = template;

  MainView.prototype.initialize = function() {
    MainView.__super__.initialize.apply(this, arguments);
    this.delegate('click', '[data-path="root"]', this.reset);
    this.delegate('click', '[data-viztype]', this["switch"]);
    this.delegate('change', 'input.repo-url', this.loadGitRepo);
    this.render();
    return this.loadGitRepo();
  };

  MainView.prototype.loadGitRepo = function() {
    var repo, url;
    url = this.$('input.repo-url').val();
    repo = github.getRepoFromURL(url);
    return github.loadRepo(repo, {
      success: (function(_this) {
        return function(results) {
          _this.data = github.parse(results.data);
          return _this.renderViz(_this.data.root);
        };
      })(this)
    });
  };

  MainView.prototype.getRendererName = function() {
    return this.$('[data-viztype].active').data('viztype');
  };

  MainView.prototype.renderViz = function(data, type) {
    var $viz, rendererName;
    if (type) {
      this.$('[data-viztype]').removeClass('active');
      this.$("[data-viztype=" + type + "]").addClass('active');
    }
    rendererName = this.getRendererName();
    $viz = this.$('#viz-graph').empty().removeClass().addClass(rendererName);
    this.renderer = new renderers[rendererName];
    this.renderer.render('#viz-graph', data, {
      width: $viz.width(),
      height: $viz.height(),
      click: this.zoom
    });
    if (data.children) {
      return this.renderList(data);
    }
  };

  MainView.prototype.renderList = function(data) {
    var $list, items, node;
    $list = this.$('viz-list').empty();
    data = data.children.sort(function(a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a === b) {
        return 0;
      }
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
    });
    items = (function() {
      var i, len, results1;
      results1 = [];
      for (i = 0, len = data.length; i < len; i++) {
        node = data[i];
        results1.push("<div>" + node.path + "</div>");
      }
      return results1;
    })();
    return $list.append(items);
  };

  MainView.prototype.reset = function(evt) {
    evt.preventDefault();
    return this.renderViz(this.data.root);
  };

  MainView.prototype["switch"] = function(evt) {
    evt.preventDefault();
    return this.renderViz(this.data.root, $(evt.currentTarget).data('viztype'));
  };

  MainView.prototype.zoom = function(node) {
    return this.renderViz(node);
  };

  return MainView;

})(View);

});

require.register("views/templates/header", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"navbar-inner\">\n  <div class=\"container\">\n    <a class=\"brand\" href=\"/\">Canopy</a>\n    <ul class=\"nav\">\n      <li><a class=\"header-link\" href=\"/test/\">Tests</a></li>\n      <li><a class=\"header-link\" href=\"https://github.com/canopyui/canopy/wiki\">Docs</a></li>\n      <li><a class=\"header-link\" href=\"https://github.com/canopyui/canopy\">Code</a></li>\n      <li><a class=\"header-link\" href=\"https://github.com/canopyui/canopy/issues\">Issues</a></li>\n    </ul>\n  </div>\n</div>";
  });
});

require.register("views/templates/main", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form>\n  <input class=\"repo-url\" type=\"text\" placeholder=\"Enter a github repo url&hellip;\" value=\"https://github.com/erikhuda/thor\">\n</form>\n\n<ul class=\"nav nav-pills viz-toggle\">\n  <li class=\"active\" data-viztype=\"circlepack\"><a href=\"#\">Circle Packing</a></a>\n  <li data-viztype=\"radialtree\" ><a href=\"#\">Radial Tree</a></li>\n</ul>\n\n<ul id=\"viz-path\" class=\"breadcrumb\">\n  <li><a data-path=\"root\" href=\"#\">root</a> <span class=\"divider\">/</span></li>\n</ul>\n\n<div id=\"viz-graph\"></div>\n<div id=\"viz-list\"></div>\n";
  });
});


//# sourceMappingURL=app.js.map