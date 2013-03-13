######################################################################
# Canopy Github Library
######################################################################
'use strict'

module.exports =
  getRepoFromURL: (url) ->
    m[1] if m = url.match(/github\.com\/([^\/]+\/[^\/]+)/)

  loadRepo: (repo, options = {}) ->
    opts = $.extend({sha: 'HEAD', recursive: 1}, options, {repo: repo})
    opts.recursive = if opts.recursive then 1 else 0
    url = "https://api.github.com/repos/#{opts.repo}/git/trees/#{opts.sha}?recursive=#{opts.recursive}&callback=?"
    $.ajax($.extend {
      url: url
      dataType: 'jsonp'
    }, opts)

  parse: (data) ->
    paths =
      root:
        name: ''
        path: ''
        children: []
    for node in data.tree
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
