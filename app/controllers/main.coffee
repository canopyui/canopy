Controller = require 'controllers/base/controller'
MainView = require 'views/main'

module.exports = class MainController extends Controller
  index: ->
    @view = new MainView()
