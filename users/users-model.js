const db = require('../database/dbConfig');

module.exports = {
    find,
    add,
    findById,
    findByUsername,
    findFavoritesById
}

function find() {
    return db('user').select('id', 'username');
};

function add(user) {
    return db('user').insert(user);
};

function findById(id) {
    return db('user')
    .where({ id })
    .first();
};

function findByUsername(username) {
    return db('user')
    .where({ username })
    .first();
};

function findFavoritesById(id) {
    return db('favorites').where('user_id', 'id')
    .join('songs', 'favorites.song_id', 'songs.track_id')
    .select('track_name', 'artist_name')
}