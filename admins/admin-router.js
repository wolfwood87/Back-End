const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Admins = require('./admin-model.js')
const restricted = require('../auth/restricted');

router.get('/badlist', restricted, (req, res) => {
    Admins.getWorkers(false)
        .then(workers => {
            res.status(200).json(workers)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/goodlist', restricted, (req, res) => {
    Admins.getWorkers(true)
        .then(workers => {
            res.status(200).json(workers)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    console.log(id)
    Admins.findById(id)
        .then(admin => {
            console.log(admin)
            res.status(200).json(admin)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.post('/register', (req, res) => {
    let admin = req.body;
    const hash = bcrypt.hashSync(admin.password, 12);
    admin.password = hash
    console.log(admin)
    Admins.add(admin)
        .then(u => {
            res.status(201).json(u)
        })
        .catch(err => {
            res.status(500).json({message: "Couldn't create admin"})
        })
})


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    Admins.findBy({ username })
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







function genToken(admin) {
    const payload = {
        adminid: admin.id,
        admin: admin.username,
    }

    const options = {
        expiresIn: "8h"
    }

    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
}
module.exports = router;