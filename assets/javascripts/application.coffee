root = exports ? this

class root.App
  path_elem : '#viz-path'
  viz_elem  : '#viz-graph'
  list_elem : '#viz-list'

  constructor: (repo) ->
    @github = Canopy.github
    @loadGitRepo(repo) if repo

    $(@path_elem).find('[data-path="root"]').on('click', =>
      @render(@data.root))
    $('[data-toggle="viztype"]').click(@onToggleViz)

  loadGitRepo: (repo, options = {}) ->
    opts = $.extend({sha: 'HEAD', local: false, recursive: true}, options, {repo: repo})
    @loaded = opts
    opts.recursive = if opts.recursive then 1 else 0
    unless opts.local
      repo = "https://api.github.com/repos/#{repo}/git/trees/#{opts.sha}?recursive=#{opts.recursive}&callback=?"
    @github.loadRepo(repo, (data) =>
      @data = @github.d3.parse(data)
      @render(@data.root)
    )

  render: (data, renderer = 'CirclePack') ->
    $(@path_elem).find('span').text(data.path)
    $elem = $(@viz_elem).empty()
    @width = $elem.width()
    @height = $elem.height()
    @renderer = new Canopy.D3[renderer]
    @renderer.render(@viz_elem, data,
      width   : @width
      height  : @height
      click   : @onCircleClick
    )
    @renderList(data) if data.children

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

  onCircleClick: (evt) =>
    #@renderer.zoom(evt)
    @render(evt)

  onToggleViz: (evt) =>
    @render(@data.root, $(evt.currentTarget).data('viztype'))
