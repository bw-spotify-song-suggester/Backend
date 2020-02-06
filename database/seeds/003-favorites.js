
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {user_id: 1, song_id: '0P2U58g8RHQ51exzBZglwu'},
        {user_id: 1, song_id: '7BOPIDwfcZxrijQsmmIJNm'},
        {user_id: 1, song_id: '5BCnkUBpOza5RMvAc7hhhW'},
        {user_id: 1, song_id: '1F71wFfIO5MMcD5YRIgAi8'},
        {user_id: 2, song_id: '0P2U58g8RHQ51exzBZglwu'},
        {user_id: 3, song_id: '0P2U58g8RHQ51exzBZglwu'},
        {user_id: 4, song_id: '0P2U58g8RHQ51exzBZglwu'}
      ]);
    });
};
