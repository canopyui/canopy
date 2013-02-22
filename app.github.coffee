root = exports ? this

class root.App.Github
  loadRepo: (repo, success, error) ->
    $.get(repo, success)

  parseForD3: (data) ->
    tree = data.tree
    paths = {}

    for node in tree
      segments = "root/#{node.path}".match(/(.*)\/(.*)/)
      file = segments[2]
      path = segments[1]
      name = path.substr(5)
      paths[path] ||=
        name: name
        children: []
        path: name
      if node.type == 'tree'
        $.extend(paths[path], node)
      else
        node.name = file
        paths[path].children.push(node)

    for path, node of paths
      parent = path.match(/(.*)\/(.*)/)
      continue unless parent && parent = parent[1]
      paths[parent] ||= {
        name: path
        children: []
      }
      paths[parent].children.push(node)

    paths.root
