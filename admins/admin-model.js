const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  getWorkers
};

function find() {
  return db('admin').select('id', 'username');
}

function findBy(filter) {
  return db('admin').where(filter);
}

async function add(admin) {
  const [id] = await db('admin').insert(admin);
  return findById(id);
}

function findById(id) {
  return db('admin')
    .where({ id })
    .first()
}


function update(id, changes) {
  return db('admin')
    .where({id})
    .first()
    .update(changes)
    .then(count => (count > 0 ? this.findById(id) : null))
}

function getWorkers(filter) {
    return db('workers').where({ approved: filter })
}

function getTrips(filter) {
  return db('user_airport_workers').where({ approved: filter })
}




