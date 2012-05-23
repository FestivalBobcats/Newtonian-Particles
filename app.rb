require 'bundler/setup'
require 'sinatra'

get '/' do
  File.read(File.join(settings.root, 'public', 'index.html'))
end