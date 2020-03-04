const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
    const password = 'password';
    const hash = bcrypt.hashSync(password, 12);
    return knex('admin').insert([
        {username: 'test@test.com', password: hash},
      ]);
    };

