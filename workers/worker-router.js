const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Workers = require('../workers/worker-model.js');
const restricted = require('../auth/restricted');

router.post('/register', (req, res) => {
    let worker = req.body;
    const hash = bcrypt.hashSync(worker.password, 12);
    console.log(hash)
    worker.password = hash
    Workers.add(worker)
        .then(u => {
            res.status(201).json(u)
        })
        .catch(err => {
            res.status(500).json({message: "Couldn't create worker"})
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    Workers.findBy({ username })
        .first()
        .then(u => {
            if(u && bcrypt.compareSync(password, u.password)) {
                const token = genToken(u);

                res.status(200).json({
                    message: `Welcome back ${u.username}`,
                    token: token
                })
            }
            else {
                res.status(500).json({message: "Error login in. Please try again."})
            }
        })
})


router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    console.log(id)
    Workers.findById(id)
        .then(worker => {
            console.log(worker)
            res.status(200).json(worker)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.put('/:id', restricted, (req, res) => {
    const { id } = req.params
    const updated = req.body
    Workers.update(id, updated)
        .then(worker => {
            res.status(200).json(worker)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id/trips', restricted, (req, res) => {
    const { id } = req.params;
    Workers.getTrips(id)
        .then(trips => {
            res.status(200).json(trips)
        })
        .catch(err => {
            res.statusu(500).json({message: "Could not retrieve trips"})
        })
})

function genToken(worker) {
    const payload = {
        workerid: worker.id,
        worker: worker.username,
    }

    const options = {
        expiresIn: "8h"
    }

    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
}


module.exports = router;