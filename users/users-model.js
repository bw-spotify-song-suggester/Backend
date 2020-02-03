const db = require('../database/dbConfig');

module.exports = {
    find,
    add,
    findById,
    findByUsername
}

function find() {
    return db('user').select('id', 'username', 'department');
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