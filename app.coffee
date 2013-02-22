root = exports ? this

class root.App
  constructor: (repo_url) ->
    @github = new App.Github
    @d3 = new App.D3
    @load(repo_url) if repo_url
    
  load: (repo_url) ->
    @github.loadRepo(repo_url, (data) =>
      data = @github.parseForD3(data)
      #data = @trimTree(data, 2)
      @d3.renderCirclePack(data)
    )

  trimTree: (tree, level = 1, extend = true) ->
    tree = $.extend({}, tree) if extend
    return tree unless tree.children
    for branch in tree.children
      continue unless branch.children
      if level == 1
        branch.size = @sumSize(branch.children)
        delete branch.children
      else
        @trimTree(branch, level-1)
    tree

  sumSize: (tree) ->
    # todo: recursively sum up blob nodes in tree
    0