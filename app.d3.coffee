root = exports ? this

class root.App.D3
  renderCirclePack: (elem, data, options = {}) ->
    width = 600
    height = 600
    format = d3.format(",d")

    pack = d3.layout.pack()
      .size([ width - 4, height - 4 ])
      .value((d) -> d.size)

    vis = d3.select(elem).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "pack")
      .append("g")
        .attr("transform", "translate(2, 2)")

    node = vis.data([ data ]).selectAll("#{elem} g.node")
        .data(pack.nodes)
      .enter().append("g")
        .attr("class", (d) -> if d.children then "node" else "leaf node")
        .attr("transform", (d) -> "translate(" + d.x + "," + d.y + ")")

    node.append("title")
      .text (d) -> d.name + (if d.children then "" else ": " + format(d.size))

    node.append("circle")
      .attr("r", (d) -> d.r)
      .on "click", options.click

    node.filter((d) -> d.children)
      .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .text (d) -> if d.name.length <= d.r/3 then d.name else ""
