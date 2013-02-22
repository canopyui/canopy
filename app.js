// Generated by CoffeeScript 1.4.0
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.App = (function() {

    function App(repo_url) {
      this.github = new App.Github;
      this.d3 = new App.D3;
      if (repo_url) {
        this.load(repo_url);
      }
    }

    App.prototype.load = function(repo_url) {
      var _this = this;
      return this.github.loadRepo(repo_url, function(data) {
        data = _this.github.parseForD3(data);
        return _this.d3.renderCirclePack(data);
      });
    };

    return App;

  })();

}).call(this);
