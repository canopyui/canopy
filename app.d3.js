// Generated by CoffeeScript 1.4.0
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.App.D3 = (function() {

    function D3() {}

    D3.prototype.renderCirclePack = function(elem, data, options) {
      var format, height, node, pack, vis, width;
      if (options == null) {
        options = {};
      }
      width = 600;
      height = 600;
      format = d3.format(",d");
      pack = d3.layout.pack().size([width - 4, height - 4]).value(function(d) {
        return d.size;
      });
      vis = d3.select(elem).append("svg").attr("width", width).attr("height", height).attr("class", "pack").append("g").attr("transform", "translate(2, 2)");
      node = vis.data([data]).selectAll("" + elem + " g.node").data(pack.nodes).enter().append("g").attr("class", function(d) {
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
      node.append("circle").attr("r", function(d) {
        return d.r;
      }).on("click", options.click);
      return node.filter(function(d) {
        return d.children;
      }).append("text").attr("text-anchor", "middle").attr("dy", ".3em").text(function(d) {
        if (d.name.length <= d.r / 3) {
          return d.name;
        } else {
          return "";
        }
      });
    };

    D3.prototype.renderRadialTree = function(data) {
      var diagonal, diameter, link, links, node, nodes, svg, tree;
      diameter = 960;
      tree = d3.layout.tree().size([360, diameter / 2 - 120]).separation(function(a, b) {
        return (a.parent === b.parent ? 1 : 2) / a.depth;
      });
      diagonal = d3.svg.diagonal.radial().projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
      });
      svg = d3.select("body").append("svg").attr("width", diameter).attr("height", diameter - 150).append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
      nodes = tree.nodes(data);
      links = tree.links(nodes);
      link = svg.selectAll(".link").data(links).enter().append("path").attr("class", "link").attr("d", diagonal);
      node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").attr("transform", function(d) {
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

    return D3;

  })();

}).call(this);
