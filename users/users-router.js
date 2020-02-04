const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware');

router.get('/dashboard/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        res.status(200).json({ message: `Welcome home, ${user.username}`})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: `NO!`,
        });
      });
});

router.put('/dashboard/:id', (req, res) => {
    const changes = req.body;
    Users.findById(req.params.id)
    .then(user => {
        if(user){
            Users.update(changes, req.params.id)
            .then(updatedUser =>{
                res.status(202).json(updatedUser)
            })
        } else {
            res.status(404).json({message: 'Cannot Find user with given Id'})
        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Nein!'
        });
    });
})



router.get('/dashboard/:id/favorites/', (req, res) => {
    console.log(req.params.id);
    Users.findFavoritesById(req.params.id)
    .then(list => {
        res.status(200).json(list);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: "Error getting favorites from database." })
    })
})



router.delete("/dashboard/:id", (req, res) => {
    Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `Goodbye!` });
      } else {
        res.status(404).json({ message: `Not found!` });
      }
    })
  })
module.exports = router;
