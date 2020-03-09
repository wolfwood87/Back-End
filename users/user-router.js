const router = require('express').Router();
const Trips = require('../trips/trip-model.js')
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

//router.put to change user data
router.put('/:id', restricted, (req, res) => {
    const { id } = req.params
    const updated = req.body
    Users.update(id, updated)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})



router.post('/:id/newtrip', restricted, (req, res) => {
    const { id } = req.params
    let newTrip = req.body;
    newTrip.user_id = id
    Trips.add(newTrip)
        .then(t => {
            res.status(201).json(t)
        })
        .catch(err => {
            res.status(500).json({message: "Could not create trip"})
        })
})

router.get('/:id/trips', restricted, (req, res) => {
    const { id } = req.params;
    Trips.getTrips(id)
        .then(trips => {
            res.status(200).json(trips)
        })
        .catch(err => {
            res.statusu(500).json({message: "Could not retrieve trips"})
        })
})
module.exports = router;