
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: 'BaronHarkonnen', password: 'BooAtreides'},
        {username: 'HarryPotter', password: 'Iamawizard'},
        {username: 'Gandalf', password: 'youshallnotpass'},
        {username: 'test', password:'test'}
      ]);
    });
};
