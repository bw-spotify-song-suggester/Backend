const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync(process.env.USER, 10);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: 'BaronHarkonnen', password: hash},
        {username: 'HarryPotter', password: hash},
        {username: 'Gandalf', password: hash},
        {username: 'test', password: hash}
      ]);
    });
};
