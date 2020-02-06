const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware');



router.get('/dashboard/:id/songs', (req, res) => {
    Users.getAllSongs()
    .then(songs => {
      res.status(200).json(songs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});



router.get('/dashboard/:id', restricted, (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: `Error getting user from database.`,
            });
        });
});

router.put('/dashboard/:id', restricted, (req, res) => {
    const changes = req.body;
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                Users.update(changes, req.params.id)
                    .then(updatedUser => {
                        res.status(202).json(updatedUser)
                    })
            } else {
                res.status(404).json({ message: 'User with given id does not exist.' })
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error posting edited user to database.'
            });
        });
})


router.get('/dashboard/:id/favorites', (req, res) => {
    Users.findFavoritesById(req.params.id)
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "Error getting favorites from database." })
        })
})


router.post('/dashboard/:id/favorites', favoriteAuth, (req, res) => {
    Users.addToFavorites(req.body)
        .then(favList => {
            res.status(201).json(favList);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error posting favorite to the database.",
            });
        });
});


router.delete('/dashboard/:id/favorites', (req, res) => {
    Users.removeSong(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'Favorite successfully deleted.' });
            } else {
                res.status(404).json({ message: 'Cannot find song with id.' });
            }
        })
})


router.delete("/dashboard/:id", restricted, (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `User successfully deleted. Goodbye!` });
            } else {
                res.status(404).json({ message: `User with given id does not exist.` });
            }
        })
})


router.get("/dashboard/logout", (req, res) => {
    if (req.token) {
        req.token.destroy(err => {
            if (err) {
                res.json({
                    message: 'Welcome to the Hotel California.'
                })
            } else {
                res.status(200).json({ message: "You're free!" })
            }
        })
    } else {
        res.status(200).json({ message: "How are you logging out without ever having logged in? Are you mad?" })
    }
})


// custom middleware

function favoriteAuth(req, res, next) {
    const song_id = req.body.song_id;
    const user_id = req.body.user_id;
    if (!song_id || !user_id) {
        return res.status(400).json({ errorMessage: "Invalid request. Please send both a song_id and user_id." })
    } else {
        next();
    }
}

function authMiddleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({ errorMessage: "Invalid request. Please input both a username and password." })
    } else {
        next();
    }
}

function deleteFavMiddleware(req, res, next) {
    const song_id = req.body.song_id;
    if (!song_id) {
        return res.status(400).json({ errorMessage: "Invalid request. Please send a song_id in the request body with your delete request." })
    } else {
        next();
    }
}

module.exports = router;
