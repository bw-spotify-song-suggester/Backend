
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('songs')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('songs').insert([
        { track_id: 'CT8U4398VESYT98345Y', artist_name: 'Dennis Leary', track_name: 'a**hole' },
        { track_id: 'IFTYJEIOT34JT8CYSE8', artist_name: 'The Proclaimers', track_name: "I'm on my way" },
        { track_id: 'IT8Y5W837Y598TYTY39', artist_name: 'DJ TIESTO', track_name: 'God is a Dancer' },
        { track_id: 'KZSKHGWITW4I898WT8T', artist_name: 'Los Del Rio', track_name: 'Macarena' },
        { track_id: 'TU3498CTY348TY3W8T8', artist_name: 'The End of Evangelion', track_name: 'Komm Susser Tod' }
      ]);
    });
};