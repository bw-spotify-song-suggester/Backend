const db = require('../database/dbConfig');

module.exports = {
    find,
    update,
    add,
    remove,
    findById,
    findByUsername,
    findFavoritesById
}

function find() {
    return db('user').select('id', 'username');
};

function update(changes, id) {
    return db('user').where('user.id', id).update(changes);
}

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
    return db('favorites').where('user_id', id)
    .join('songs', 'favorites.song_id', 'songs.track_id')
    .select('track_name', 'artist_name', 'track_id')
};

function remove(id) {
    return db('user')
    .where('user.id', id)
    .del()
}