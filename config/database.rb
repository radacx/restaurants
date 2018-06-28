require 'couchrest'
require 'dotenv'

Dotenv.load()

def init_db
  if ENV['VCAP_SERVICES']
    begin
      svcs = JSON.parse ENV['VCAP_SERVICES']
      cloudant = svcs.detect { |k,v| k =~ /^cloudantNoSQLDB/ }.last.first
      creds = cloudant['credentials']
      @db = get_couch_db(creds['url'])
    rescue
      puts 'No database found'
    end
  else
    if ENV['CLOUDANT_URL']
      @db = get_couch_db(ENV['CLOUDANT_URL'])
    else
      @db = CouchRest.database!('https://9d54611d-8ae5-4f0c-a9de-a120272129fb-bluemix:6693bc014c1a33e4b8708ee359fa47ffba1b745b0617fd972b4e249cd285a204@9d54611d-8ae5-4f0c-a9de-a120272129fb-bluemix.cloudant.com/restaurants_db')
    end
  end
end
    
    
# Helper function to construct the proper URL
# to the Couch DB.
def get_couch_db(url)
  if !url.end_with?('/')
    url = url + '/'
  end
  
  url = url + ENV['DATABASE_NAME']

  puts 'Using URL: ' + url

  CouchRest.database!(url)
end
    
init_db()
DB = @db
