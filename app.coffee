root = exports ? this

class root.App
  constructor: (repo) ->
    @github = new App.Github
    @d3 = new App.D3
    
    @github.loadRepo(repo, (data) =>
      data = @github.parseForD3(data)
      @d3.renderCirclePack(data)
    ) if repo

