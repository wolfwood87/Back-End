const db = require('../data/dbConfig.js');

module.exports = {
  get,
  add,
  getTrips,
  findBy,
  findById,
  update,
  remove
};

function getTrips(id) {
  return db('user_airport_worker as uaw')
            .leftJoin('users as u', 'u.id', 'uaw.user_id')
            .leftJoin('airports as a', 'a.id', 'uaw.airport_id')
            .leftJoin('workers as w', 'w.id', 'uaw.worker_id')
            .select('u.username as user', 'a.name as airport_name', 'a.iata_code', 'a.icao_code', 'w.username as worker', 'uaw.*')
            .where({user_id: id});
}
function get() {
    return db('user_airport_worker')
}

function findBy(filter) {
  return db('user_airport_worker').where(filter);
}

async function add(trip) {
  const [id] = await db('user_airport_worker').insert(trip, "id");
  return findById(id);
}

function findById(id) {
  return db('user_airport_worker')
    .where({ id: id })
    .first()
}

function update(id, changes) {
  return db('user_airport_worker')
    .where({id})
    .first()
    .update(changes)
    .then(count => (count > 0 ? this.findById(id) : null))
}

function remove(id) {
    return db("user_airport_worker")
        .where("id", id)
        .del();
}