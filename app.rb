require 'rubygems'
require 'sinatra'

set :static, true
set :public_folder, './'

get '/' do
  redirect '/index.html'
end
