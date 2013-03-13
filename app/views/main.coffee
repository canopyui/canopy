template = require 'views/templates/main'
View = require 'views/base/view'
github = require 'lib/canopy/github'
renderers =
  circlepack: require 'lib/canopy/d3/circlepack'
  radialtree: require 'lib/canopy/d3/radialtree'

module.exports = class MainView extends View
  autoRender: no
  className: 'main container'
  container: '#page-container'
  template: template

  initialize: ->
    super
    @delegate 'click', '[data-path="root"]', @reset
    @delegate 'click', '[data-viztype]', @switch
    @delegate 'change', 'input.repo-url', @loadGitRepo
    @render()
    @loadGitRepo()

  loadGitRepo: =>
    url = @$('input.repo-url').val()
    repo = github.getRepoFromURL url
    github.loadRepo repo, success: (results) =>
      @data = github.parse results.data
      @renderViz @data.root 

  getRendererName: ->
    @$('[data-viztype].active').data('viztype')

  renderViz: (data, type) ->
    if type
      @$('[data-viztype]').removeClass('active')
      @$("[data-viztype=#{type}]").addClass('active')

    # todo: move to own view
    # @$(@path_elem).find('span').text(data.path)

    rendererName = @getRendererName()

    $viz = @$('#viz-graph')
      .empty()
      .removeClass()
      .addClass rendererName

    @renderer = new renderers[rendererName]
    @renderer.render '#viz-graph', data,
      width   : $viz.width()
      height  : $viz.height()
      click   : @zoom
    @renderList data if data.children

  renderList: (data) ->
    $list = @$('viz-list').empty()
    data = data.children.sort (a, b) ->
      a = a.name.toLowerCase(); b = b.name.toLowerCase()
      return 0 if (a == b)
      return 1 if (a > b)
      return -1 if (a < b)
    items = for node in data
      "<div>#{node.path}</div>"
    $list.append items

  reset: (evt) ->
    evt.preventDefault()
    @renderViz @data.root

  switch: (evt) ->
    evt.preventDefault()
    @renderViz @data.root, $(evt.currentTarget).data('viztype')

  zoom: (node) =>
    @renderViz node
