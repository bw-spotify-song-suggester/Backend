const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware');

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
                res.status(404).json({ message: 'Cannot Find user with given id.' })
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Nein!'
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


router.post('/dashboard/:id/favorites', (req, res) => {
    console.log(req.body)
    Users.addToFavorites(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Back-End's Fault, Buddy!",
            });
        });
});


router.delete('/dashboard/:id/favorites', (req, res) => {
    Users.removeSong(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'It came tumbling down!' });
            } else {
                res.status(404).json({ message: 'Cannot find song and neither can you!' });
            }
        })
})



router.delete("/dashboard/:id", restricted, (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `Goodbye!` });
            } else {
                res.status(404).json({ message: `Not found!` });
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

module.exports = router;
