const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
};

function find() {
  return db('airports').select('icao_code', 'iata_code', 'name', 'city', 'country', 'lat_deg', 'lat_min', 'lat_sec', 'lat_dir', 'lon_deg', 'lon_min', 'lon_sec', 'lon_dir', 'altitude', 'lat_decimal', 'lon_decimal');
}

function findBy(filter) {
  return db('airports').where(filter);
}
