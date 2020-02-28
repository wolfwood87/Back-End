const router = require('express').Router();

const Users = require('./user-model.js');
const restricted = require('../auth/restricted');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    console.log(id)
    Users.findById(id)
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;