exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favorites')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        { user_id: 1, song_id: 'CT8U4398VESYT98345Y' },
        { user_id: 1, song_id: 'IT8Y5W837Y598TYTY39' },
        { user_id: 1, song_id: 'IFTYJEIOT34JT8CYSE8' },
        { user_id: 1, song_id: 'KZSKHGWITW4I898WT8T' },
        { user_id: 1, song_id: 'TU3498CTY348TY3W8T8' },
        { user_id: 2, song_id: 'IFTYJEIOT34JT8CYSE8' },
        { user_id: 2, song_id: 'KZSKHGWITW4I898WT8T' },
        { user_id: 2, song_id: 'TU3498CTY348TY3W8T8' },
        { user_id: 3, song_id: 'KZSKHGWITW4I898WT8T' },
        { user_id: 4, song_id: 'TU3498CTY348TY3W8T8' }
      ]);
    });
};
