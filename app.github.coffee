root = exports ? this

class root.App.Github
  loadRepo: (repo, success, error) ->
    $.get(repo, success)

  parseForD3: (data) ->
    paths =
      root:
        name: ''
        path: ''
        children: []
    for node in data.tree
      if node.type == 'blob'
        @_parseForD3Blob(paths, node)
      else
        @_parseForD3Tree(paths, node)
    @_parseForD3Collapse(paths)

  _parseForD3Blob: (paths, node) ->
    segments = "root/#{node.path}".match(/(.*)\/(.*)/)
    node.name = segments[2]
    path = segments[1]
    name = path.substr(5)
    paths[path] ||=
      name: name
      path: node.path
      children: []
    paths[path].children.push(node)

  _parseForD3Tree: (paths, node) ->
    path = "root/#{node.path}"
    name = path.match(/(.*)\/(.*)/)[2]
    paths[path] ||=
      name: name
      children: []
    $.extend(paths[path], node)

  _parseForD3Collapse: (paths) ->
    for path, node of paths
      parent = path.match(/(.*)\//)
      continue unless parent && parent = parent[1]
      paths[parent].children.push(node)
    paths
