require 'sinatra/base'
require 'sinatra/assetpack'
require 'haml'
require 'sass'
require 'coffee-script'

class App < Sinatra::Base
  set :root, File.dirname(__FILE__)
  register Sinatra::AssetPack

  assets {
    serve '/assets/javascripts',  from: '/assets/javascripts'
    serve '/assets/stylesheets',  from: '/assets/stylesheets'
    serve '/assets/images',       from: '/assets/images'

    js :libs, 'assets/javascripts/libs.js', [
      '/assets/javascripts/vendor/*.js'
    ]

    js :app, '/assets/javascripts/app.js', [
      '/assets/javascripts/application.js',
      '/assets/javascripts/lib/*.js'
    ]

    css :app, '/assets/stylesheets/app.css', [
      '/assets/stylesheets/*.css'
    ]

    js_compression  :uglify
    css_compression :sass
  }
  
  get '/' do
    haml :index, :format => :html5
  end
end


if __FILE__ == $0
  App.run!
end
