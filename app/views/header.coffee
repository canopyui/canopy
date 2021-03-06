View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
  autoRender: yes
  className: 'header navbar navbar-fixed-top'
  container: '#header-container'
  id: 'header'
  template: template
