######################################################################
# Canopy D3 Circle Pack
######################################################################
'use strict'

module.exports = class CirclePack

  render: (elem, data, options = {}) ->
    options = $.extend({
      width   : 600
      height  : 600
    }, options)
    @width  = options.width
    @height = options.height
    format  = d3.format(",d")

    pack = d3.layout.pack()
      .size([ @width - 4, @height - 4 ])
      .value((d) -> d.size)

    @viz = d3.select(elem).append("svg")
        .attr("width", @width)
        .attr("height", @height)
        .attr("class", "pack")
      .append("g")
        .attr("transform", "translate(2, 2)")

    node = @viz.data([ data ]).selectAll("#{elem} g.node")
      .data(pack.nodes)
      .enter().append("g")
        .attr("class", (d) -> if d.children then "node" else "leaf node")
        .attr("transform", (d) -> "translate(" + d.x + "," + d.y + ")")

    node.append("title")
      .text (d) -> d.name + (if d.children then "" else ": " + format(d.size))

    @circles = node.append("circle")
      .attr("r", (d) -> d.r)
      .on("click", options.click)

    node.filter((d) -> d.children)
      .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .text (d) -> if d.name.length <= d.r/3 then d.name else ""

    @circles.attr('r', 0)
      .transition().duration(1000)
      .attr("r", (d) -> d.r)

  zoom: (d) ->
    x = d3.scale.linear().range([0, @width])
    y = d3.scale.linear().range([0, @height])
    # x.domain([d.x, d.x + 2])
    # y.domain([d.y, 1]).range([(if d.y then 20 else 0), @height])
    @circles.transition()
      .duration(750)
      .attr("cx", (d, i) -> d.x - i)
      .attr("cy", (d, i) -> d.y - i)
      # .attr("width", (d) -> x(d.x + 2) - x(d.x))
      # .attr("height", (d) -> y(d.y + 2) - y(d.y))
