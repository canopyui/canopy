root = exports ? this

class root.App.Github
  loadRepo: (repo, success, error, recursive = true) ->
    $.get("https://api.github.com/repos/#{repo}/git/trees/HEAD?recursive=#{if recursive then '1' else '0'}", success)

  parseForD3: (data) ->
    tree = data.tree
    paths = {}

    for node in tree
      continue if node.type == 'tree'
      segments = "root/#{node.path}".match(/(.*)\/(.*)/)
      file = segments[2]
      path = segments[1]
      paths[path] ||=
        name: path.substr(5)
        children: []
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
