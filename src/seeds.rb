class Seeds
  class << self
    def seed_restaurants
      @italian_restaurant = DatabaseHelper.insert_restaurant(name: "Italian")
      @sushi_restaurant = DatabaseHelper.insert_restaurant(name: "Sushi")
      @mexican_restaurant = DatabaseHelper.insert_restaurant(name: "Mexican")
      
      return 3
    end
    
    def seed_tables
      @tables = [
        DatabaseHelper.insert_table(
          seats: 5, 
          number: 1,  
          restaurant_id: @italian_restaurant['id']),
  
        DatabaseHelper.insert_table(
          seats: 2, 
          number: 2,  
          restaurant_id: @italian_restaurant['id']),
    
        DatabaseHelper.insert_table(
          seats: 3, 
          number: 3,  
          restaurant_id: @italian_restaurant['id']),

        DatabaseHelper.insert_table(
          seats: 6, 
          number: 1,  
          restaurant_id: @sushi_restaurant['id']),
        
        DatabaseHelper.insert_table(
          seats: 2, 
          number: 12, 
          restaurant_id: @sushi_restaurant['id']),
              
        DatabaseHelper.insert_table(
          seats: 20, 
          number: 1,  
          restaurant_id: @mexican_restaurant['id'])
      ]
      
      @tables.count
    end
    
    def seed_reservations()
      reservations = [
        DatabaseHelper.insert_reservation(
          restaurant_id: @italian_restaurant['id'], 
          table_id: @tables[0]['id'],
          block: 2,
          day: Date.today,
          for_name: 'Juraj')
      ]
      
      reservations.count
    end
    
    def get_restaurant_seeds()
      [@italian_restaurant, @sushi_restaurant, @mexican_restaurant]
    end
  end
end