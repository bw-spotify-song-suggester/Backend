const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync(process.env.USER, 10);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { id: 1, username: 'BaronHarkonnen', password: hash },
        { id: 2, username: 'HarryPotter', password: hash },
        { id: 3, username: 'Gandalf', password: hash },
        { id: 4, username: 'test', password: hash },
        { id: 5, username: 'allie', password: '000000' }
      ]);
    });
};