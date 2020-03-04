const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  const password = 'password';
  const hash = bcrypt.hashSync(password, 12);
  return knex('workers').insert([
      {username: 'testwork1', password: hash},
      {username: 'testwork2', password: hash, name: 'Bob the Worker', description: 'Just another worker'},
    ]);
  };

