const router = require('express').Router();
const Users = require('./users-model.js');

router.get('/dashboard/:id', (req, res) => {
    console.log(req.params.id)
    Users.findById(req.params.id)
    .then(user => {
        console.log(user)
        res.status(200).json({ message: `Welcome home, ${user.username}`})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: `NO!`,
        });
      });
})

module.exports = router;
