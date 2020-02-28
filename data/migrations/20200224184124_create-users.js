
exports.up = function(knex, Promise) {
    return knex.schema
      .createTable('admin', tbl => {
        tbl.increments();
        tbl.string('username', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
      })
      .createTable('airports', tbl => {
        tbl.increments();
        tbl.string('icao_code', 4);
        tbl.string('iata_code', 3);
        tbl.string('name', 50);
        tbl.string('city', 50);
        tbl.string('country', 50);
        tbl.int('lat_deg');
        tbl.int('lat_min');
        tbl.int('lat_sec');
        tbl.string('lat_dir');
        tbl.int('lon_deg');
        tbl.int('lon_min');
        tbl.int('lon_sec');
        tbl.string('lon_dir');
        tbl.int('altitude');
        tbl.double('lat_decimal');
        tbl.double('lon_decimal');


      })
      .createTable('users', tbl => {
          tbl.increments();
          tbl.string('username', 255).notNullable().unique();
          tbl.string('password', 255).notNullable();
          tbl.blob('image');
          tbl.string('name', 255);
          tbl.string('address', 255);
          tbl.integer('airport_id').unsigned().references('airports.id').onDelete('CASCADE').onUpdate('CASCADE');
          tbl.integer('phone');
      })
      .createTable('workers', tbl => {
        tbl.increments();
        tbl.string('username', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.string('name', 255);
        tbl.text('description');
        tbl.blob('image');
      })
      .createTable('user_airport_worker', tbl => {
        tbl.increments();
        tbl.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer('airport_id').unsigned().notNullable().references('airports.id').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.integer('worker_id').unsigned().references('workers.id').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('airline', 255);
        tbl.string('flight_number', 255);
        tbl.string('departure_time', 255).notNullable();
        tbl.integer('luggage');
        tbl.integer('children');
        tbl.text('special_needs');
      })
    
    
};

exports.down = function(knex) {
  return (knex.schema
              .dropTableIfExists('user_airport_worker')
              .dropTableIfExists('workers')
              .dropTableIfExists('users')
              .dropTableIfExists('airports')
              .dropTableIfExists('admin')
    )
};
