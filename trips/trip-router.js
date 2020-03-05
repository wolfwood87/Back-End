const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Trips = require('../trips/trip-model.js');
const restricted = require('../auth/restricted');


router.get('/', restricted, (req, res) => {
    Trips.get()
        .then(trip => {
            res.status(200).json(trip)
        })
        .catch(err => {
            res.status(500).json({message: "Could not retrieve trips"})
        })
})

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    console.log(id)
    Trips.findById(id)
        .then(trip => {
            res.status(200).json(trip)
        })
        .catch(err => {
            res.status(500).json({message: "Could not retrieve trip"})
        })
})

router.put('/:id', restricted, (req, res) => {
    const { id } = req.params
    const updated = req.body
    Trips.update(id, updated)
        .then(trip => {
            res.status(200).json(trip)
        })
        .catch(err => {
            res.status(500).json({message: "Error updating trip"})
        })
})


router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    Trips.remove(id)
        .then(del => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({message: "Trip could not be deleted"})
        })
})

module.exports = router;