require_relative '../config/database'
require_relative 'view_functions'
require_relative 'definitions'

class DatabaseHelper
  class << self
    
    def get_all_restaurants()
      DB.view('docType/restaurants')['rows'].map {|row| { 'id' => row['value']['_id'], 
                                                          'name' => row['value']['name'] }}
    end
    
    def get_all_reservations()
      DB.view('docType/reservations')['rows'].map {|row| { 'id' => row['value']['_id'], 
                                                          'day' => row['value']['day'],
                                                          'restaurant' =>
                                                            {'id' => DB.get(row['value']['restaurant_id'])['_id'], 'name' => DB.get(row['value']['restaurant_id'])['name']},
                                                          'block' => row['value']['block'],
                                                          'forName' => row['value']['for_name'] }}
    end
    
    def get_tables_for_restaurant(id:)
      DB.view('restaurant_mappings/tables', 'key' => id)['rows'].map {|row| { 
          'id' => row['value']['_id'],
          'number' => row['value']['number'],
          'seats' => row['value']['seats']}}
    end
    
    def get_reservations_for_restaurant(restaurant_id:, table_id:, day:)
      result_rows = DB.view('restaurant_mappings/reservations', 
        'key' => {'restaurant_id' => restaurant_id, 'table_id' => table_id, 'day' => day})['rows']
      result_rows.map { |row| {
        'id' => row['value']['_id'],
        'block' => row['value']['block']
      }}
    end
    
    def get_free_tables(restaurant_id:, whole_day:, seats:, hours_to:, hours_from:, date:)
      available_tables = get_tables_for_restaurant(id: restaurant_id)
      available_tables.reject! { |table| table['seats'].to_i < seats.to_i }
      
      result_tables = []

      available_tables.each { 
        |table|
          current_reservations = get_reservations_for_restaurant(
          restaurant_id: restaurant_id,
          table_id: table['id'],
          day: date)
          
          current_reservations.map! { |reservation| reservation['block'].to_i }
          
          free_blocks = []
          
          if whole_day.nil? or whole_day == 'false'
            lower_part = (hours_from.to_i / 2) + (hours_from.to_i % 2)
            upper_part = (hours_to.to_i / 2) - 1
            if upper_part - lower_part >= 0
              selected_blocks = [*lower_part - 1..upper_part - 1]
              free_blocks = selected_blocks.reject { |block| current_reservations.include?(block)}
            end
          else
            all_blocks = [*0..TOTAL_BLOCKS - 1]
            free_blocks = all_blocks.reject { |block| current_reservations.include?(block)}
          end
          
          result_tables << { 
            'id' => table['id'], 
            'number' => table['number'], 
            'seats' => table['seats'],
            'freeTimeBlocks' => free_blocks }
        }
        
        result_tables
    end
        
    def insert_restaurant(name:)
      DB.save_doc(
        'name' => name,
        'docType' => 'restaurant')
    end
    
    def insert_table(seats:, number:, restaurant_id:)
      DB.save_doc(
        'restaurant_id' => restaurant_id, 
        'number' => number,
        'seats' => seats,
        'docType' => 'table')
    end
        
    def insert_reservation(restaurant_id:, block:, day:, table_id:, for_name:) 
      actual_reservations = get_reservations_for_restaurant(
        restaurant_id: restaurant_id,
        table_id: table_id,
        day: day).map { |reservation| reservation['block']}
              
      DB.save_doc(
        'restaurant_id' => restaurant_id, 
        'table_id' => table_id,
        'block' => block,
        'day' => day,
        'for_name' => for_name,
        'docType' => 'reservation') unless actual_reservations.include?(block)
    end
    
    def delete_reservation(id:)
      found_doc = DB.get(id)
      if found_doc.nil?
        return {'Message' => 'Specified ID not found'}
      else
        DB.delete_doc(found_doc)
      end
    end

    def init_views
      if DB.get('_design/docType').nil?
        DB.save_doc( "_id" => "_design/docType", 
          :views => {
            :restaurants => {
              :map => DOCTYPE_MAPPING_RESTAURANTS
            },
            :reservations => {
              :map => DOCTYPE_MAPPING_RESERVATIONS
            },
            :tables => {
              :map => DOCTYPE_MAPPING_TABLES
            }
          }
        )
      end
      if DB.get('_design/restaurant_mappings').nil?
        DB.save_doc( "_id" => "_design/restaurant_mappings", 
          :views => {
            :tables => {
              :map => RESTAURANT_MAPPING_TABLES
            },
            :reservations => {
              :map => RESTAURANT_MAPPING_RESERVATIONS
            }
          }
        )
      end
    end
    
    def test_delete_restaurants
      ids = Seeds.get_restaurant_seeds().map {|entry| entry['id']}
      ids.each { |id| DB.delete_doc(DB.get(id))}
      puts "Restaurants entries deleted"
    end
  end
end
