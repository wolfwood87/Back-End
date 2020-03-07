const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  getTrips
};

function find() {
  return db('users as u')
    .join('airports as a', 'a.id', 'u.airport_id')
    .select('u.*', 'a.name', 'a.iata_code', 'a.icao_code')
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
}


function update(id, changes) {
  return db('users')
    .where({id})
    .first()
    .update(changes)
    .then(count => (count > 0 ? this.findById(id) : null))
}

function getTrips(id) {
  return db('user_airport_worker as uaw')
            .leftJoin('users as u', 'u.id', 'uaw.user_id')
            .leftJoin('airports as a', 'a.id', 'uaw.airport_id')
            .leftJoin('workers as w', 'w.id', 'uaw.worker_id')
            .select('u.username', 'a.name', 'w.username', 'uaw.*')
            .where({user_id: id});
}
