const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  const password = 'password';
  const hash = bcrypt.hashSync(password, 12);
  return knex('users').insert([
      {username: 'test1', password: hash},
      {username: 'test2', password: hash, name: 'Bob the Builder', address: '123 Test Street', phone: '555-555-5555'},
    ]);
  };

