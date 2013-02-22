root = exports ? this

class root.App.D3CirclePack
  render: (elem, data, options = {}) ->
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


class root.App.D3RadialTree
  render: (elem, data, options = {}) ->
    diameter = 960
    tree = d3.layout.tree()
      .size([360, diameter / 2 - 120])
      .separation((a, b) -> ((if a.parent is b.parent then 1 else 2)) / a.depth)

    diagonal = d3.svg.diagonal.radial()
      .projection((d) -> [d.y, d.x / 180 * Math.PI])

    svg = d3.select(elem).append("svg")
        .attr("width", diameter)
        .attr("height", diameter - 150)
      .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")")

    nodes = tree.nodes(data)
    links = tree.links(nodes)
    link = svg.selectAll("#{elem} .link")
        .data(links)
      .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", diagonal)
        
    node = svg.selectAll("#{elem} .node")
        .data(nodes)
      .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) -> "rotate(" + (d.x - 90) + ")translate(" + d.y + ")")
        
    node.append("circle")
        .attr "r", 4.5
        
    node.append("text")
        .attr("dy", ".31em")
        .attr("text-anchor", (d) -> (if d.x < 180 then "start" else "end"))
        .attr("transform", (d) -> (if d.x < 180 then "translate(8)" else "rotate(180)translate(-8)"))
        .text (d) -> d.name

    d3.select(self.frameElement).style "height", diameter - 150 + "px"
  
