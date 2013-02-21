// Generated by CoffeeScript 1.4.0
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.App = (function() {

    function App(repo) {
      var _this = this;
      this.github = new App.Github;
      this.d3 = new App.D3;
      if (repo) {
        this.github.loadRepo(repo, function(data) {
          data = _this.github.parseForD3(data);
          return _this.d3.renderCirclePack(data);
        });
      }
    }

    return App;

  })();

}).call(this);
