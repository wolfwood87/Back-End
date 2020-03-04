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
  return db('workers').select('id', 'username');
}

function findBy(filter) {
  return db('workers').where(filter);
}

async function add(worker) {
  const [id] = await db('workers').insert(worker);
  return findById(id);
}

function findById(id) {
  return db('workers')
    .where({ id })
    .first()
}

function update(id, changes) {
  return db('workers')
    .where({id})
    .first()
    .update(changes)
    .then(count => (count > 0 ? this.findById(id) : null))
}

function getTrips(id) {
  return db('user_airport_worker as uaw')
            .leftJoin('workers as w', 'w.id', 'uaw.worker_id')
            .leftJoin('users as u', 'u.id', 'uaw.user_id')
            .leftJoin('airports as a', 'a.id', 'uaw.airport_id')
            .select('u.username', 'a.name', 'w.username as worker', 'uaw.*')
            .where({worker_id: id});
}