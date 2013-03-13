MainView = require 'views/main'

describe 'MainView', ->
  beforeEach ->
    @view = new MainView

  afterEach ->
    @view.dispose()

  it 'should auto-render', ->
    expect(@view.$el.find 'img').to.have.length 1
