const db = require('../database/dbConfig');

module.exports = {
    find,
    update,
    add,
    addToFavorites,
    remove,
    removeSong,
    getAllSongs,
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

function addToFavorites(fav) {
    return db('favorites')
        .insert(fav)
        .then(ids => {
            [ ids ] = ids   
            return findFavoritesById(fav.user_id);
        });
};

function findById(id) {
    return db('user')
        .where({ id })
        .first();
};

function getAllSongs() {
    return db('songs')
        
}

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

function findFavoritesBySongId(id) {
    return db('favorites').where('song_id', id)
        .join('songs', 'favorites.song_id', 'songs.track_id')
        .select('track_name', 'artist_name', 'track_id')
};
 
function remove(id) {
    return db('user')
        .where('user.id', id)
        .del()
}

function removeSong(song_id) {
    return db('favorites')
        .where(song_id)
        .del();
}