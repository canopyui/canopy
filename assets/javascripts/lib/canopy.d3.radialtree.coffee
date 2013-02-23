######################################################################
# Canopy D3 Radial Tree
######################################################################
root = exports ? this
root.Canopy ||= {}
root.Canopy.D3 ||= {}

class root.Canopy.D3.RadialTree
  render: (elem, data, options = {}) ->
    width     = options.width
    height    = options.height
    diameter  = options.diameter || Math.min(options.width, options.height)

    tree = d3.layout.tree()
      .size([360, diameter / 2 - 120])
      .separation((a, b) -> ((if a.parent is b.parent then 1 else 2)) / a.depth)

    diagonal = d3.svg.diagonal.radial()
      .projection((d) -> [d.y, d.x / 180 * Math.PI])

    svg = d3.select(elem).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

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

