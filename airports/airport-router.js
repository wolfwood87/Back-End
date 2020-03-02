const router = require('express').Router();
const Airports = require('../airports/airport-model.js');

router.get('/', (req, res) => {
    Airports.find()
        .then(airports => {
            res.status(201).json(airports)
        })
        .catch(err => {
            res.status(500).json({message: "Could not retrieve airports"})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params.id
    Airports.findBy({iata_code: id})
        .then(airport => {
            res.status(200).json(airport)
        })
        .catch(err => {
            res.status(500).json({message: "Could not retrieve airport"})
        })
})

module.exports = router;