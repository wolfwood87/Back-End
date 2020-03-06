
exports.seed = function(knex, Promise) {

  return knex('user_airport_worker').insert([
      {user_id: 1, airport_id: 1, airline: 'Southwest', flight_number: '1', departure_time: '10:30 AM', luggage: 2, children: 1, special_needs: 'a hug'},
      {user_id: 2, airport_id: 1, airline: 'American Airlines', flight_number: '2', departure_time: '10:30 PM', luggage: 1, children: 2, special_needs: 'another hug'},
    ]);
  };

