
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('admin').insert([
        {username: 'legato_5@yahoo.com'},
        {password: 'fdsafjmoiweioafj'},
      ]);
    };
