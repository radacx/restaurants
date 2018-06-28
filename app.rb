require 'sinatra'
require 'json'

require_relative 'src/database_helper'
require_relative 'src/seeds'

set :public_folder, 'client/build'

before do
  if request.request_method == 'OPTIONS'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = ['OPTIONS', 'HEAD', 'GET', 'POST', 'DELETE']
    response.headers["Access-Control-Allow-Headers"] = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']

    halt 200
  else 
    headers 'Access-Control-Allow-Origin' => '*', 
            'Access-Control-Allow-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
  end
end

get '/' do
  File.read(File.join(settings.public_folder, 'index.html'))
end

get '/init-all' do
  DatabaseHelper.init_views()
  seed_initial_data
end

# get '/insert-restaurants' do
#   count = Seeds.seed_restaurants()
#   JSON.generate({ 'status' => 'ok', 'inserted_count' => count })
# end

# get '/insert-tables' do
#   count = Seeds.seed_tables()
#   JSON.generate({ 'status' => 'ok', 'inserted_count' => count })
# end

# get '/insert-reservations' do
#   count = Seeds.seed_reservations()
#   JSON.generate({ 'status' => 'ok', 'inserted_count' => count })
# end

# get '/insert-testing-data' do
#   seed_initial_data
# end

get '/restaurants' do
  result = DatabaseHelper.get_all_restaurants()
  JSON.generate(result)
end

get '/reservations' do
  result = DatabaseHelper.get_all_reservations()
  JSON.generate(result)
end

get '/restaurants/:id/free_tables' do
  if params['seats'].nil? or params['day'].nil?
    return JSON.generate({'ERROR' => 'Seats or day is not specified in the request'})
  end
  
  result = DatabaseHelper.get_free_tables(
    restaurant_id: params['id'],
    whole_day: params['wholeDay'],
    seats: params['seats'],
    hours_to: params['hoursTo'],
    hours_from: params['hoursFrom'], 
    date: params['day'])
    
  JSON.generate(result)
end

post '/restaurants/:id/create_reservation' do
  json_params = JSON.parse(request.body.read)
  
  result = DatabaseHelper.insert_reservation(
  restaurant_id: params[:id], 
  block: json_params['block'],
  day: json_params['day'],
  table_id: json_params['tableId'],
  for_name: json_params['forName'])
  
  status = nil
  
  if result.nil? 
    status = 'cannot insert - already existing'
    response['Access-Control-Allow-Origin'] = '*'
    JSON.generate({ 'status' => status })
  else
    status = result['ok'] ? 'ok' : 'failed'
    JSON.generate({ 'status' => status, 'id' => result['id'] })
  end
end

delete '/reservations/:id/remove' do
  result = DatabaseHelper.delete_reservation(id: params['id'])
  JSON.generate(result)
end

private
  def seed_initial_data
    restaurants_count = Seeds.seed_restaurants()
    tables_count = Seeds.seed_tables()
    reservations_count = Seeds.seed_reservations()
    JSON.generate([{ 'entity' => 'restaurants', 'status' => 'ok', 'inserted_count' => restaurants_count },
      { 'entity' => 'tables', 'status' => 'ok', 'inserted_count' => tables_count },
      { 'entity' => 'reservations', 'status' => 'ok', 'inserted_count' => reservations_count }])
  end