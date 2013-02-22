root = exports ? this

class root.App
  constructor: (repo_url) ->
    @github = new App.Github
    @d3 = new App.D3
    @load(repo_url) if repo_url
    
  load: (repo_url) ->
    @github.loadRepo(repo_url, (data) =>
      data = @github.parseForD3(data)
      @d3.renderCirclePack(data)
    )

