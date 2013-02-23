######################################################################
# Canopy Github Library
######################################################################

root = exports ? this
root.Canopy ||= {}

root.Canopy.github =
  loadRepo: (repo, success, error) ->
    $.getJSON(repo, success)

# Github => D3 Parsers
root.Canopy.github.d3 =
  parse: (data) ->
    paths =
      root:
        name: ''
        path: ''
        children: []
    for node in data.data.tree
      if node.type == 'blob'
        @parseBlob(paths, node)
      else
        @parseTree(paths, node)
    @collapse(paths)

  parseBlob: (paths, node) ->
    segments = "root/#{node.path}".match(/(.*)\/(.*)/)
    node.name = segments[2]
    path = segments[1]
    name = path.substr(5)
    paths[path] ||=
      name: name
      path: node.path
      children: []
    paths[path].children.push(node)

  parseTree: (paths, node) ->
    path = "root/#{node.path}"
    name = path.match(/(.*)\/(.*)/)[2]
    paths[path] ||=
      name: name
      children: []
    $.extend(paths[path], node)

  collapse: (paths) ->
    for path, node of paths
      parent = path.match(/(.*)\//)
      continue unless parent && parent = parent[1]
      paths[parent].children.push(node)
    paths
