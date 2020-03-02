const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
};

function find() {
  return db('airports').select('id', 'icao_code', 'name');
}

function findBy(filter) {
  return db('airports').where(filter);
}
