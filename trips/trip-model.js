const db = require('../data/dbConfig.js');

module.exports = {
  add,
  getTrips,
  findBy,
  findById,
  update,
  remove
};

function getTrips(id) {
  return db('user_airport_worker as uaw')
            .join('users as u', 'u.id', 'uaw.user_id')
            .join('airports as a', 'a.id', 'uaw.airport_id')
            .join('workers as w', 'w.id', 'uaw.worker_id')
            .select('u.username', 'a.name', 'w.username', 'uaw.*')
            .where({user_id: id});
}

function findBy(filter) {
  return db('user_airport_worker').where(filter);
}

async function add(trip) {
  const [id] = await db('user_airport_worker').insert(trip);
  return findById(id);
}

function findById(id) {
  return db('user_airport_worker')
    .where({ id })
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