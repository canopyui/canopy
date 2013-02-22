root = exports ? this

class root.App
  path_elem : '#viz-path'
  viz_elem  : '#viz-collections'
  list_elem : '#viz-list'

  constructor: (d3_layout) ->
    @github = new App.Github
    @d3 = new d3_layout   
    $(@path_elem).find('[data-path="root"]').on('click', =>
      $(@path_elem).find('[data-path="path"]').empty()
      @loadGitRepo(@loaded.repo, $.extend(@loaded, sha: 'HEAD'))
    )

  loadGitRepo: (repo, options = {}) ->
    opts = $.extend({sha: 'HEAD', local: false, recursive: true}, options, {repo: repo})
    @loaded = opts
    opts.recursive = if opts.recursive then 1 else 0
    unless opts.local
      repo = "https://api.github.com/repos/#{repo}/git/trees/#{opts.sha}?recursive=#{opts.recursive}"
    @github.loadRepo(repo, (data) =>
      data = @github.parseForD3(data)
      #data = @trimTree(data, 2)
      $(@viz_elem).empty()
      @d3.render(@viz_elem, data, click: @onCircleClick)
      @renderList(data) if data.children
    )

  renderList: (data) ->
    list = $(@list_elem).empty()
    data = data.children.sort((a, b) ->
      a = a.name.toLowerCase(); b = b.name.toLowerCase()
      return 0 if (a == b)
      return 1 if (a > b)
      return -1 if (a < b)
    )
    for node in data
      list.append("<div>#{node.path}</div>")

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

  onCircleClick: (evt) =>
    $(@path_elem).find('[data-path="path"]').text(evt.path)
    @loadGitRepo(@loaded.repo, $.extend(@loaded, sha: evt.sha))
