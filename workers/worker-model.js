const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update 
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