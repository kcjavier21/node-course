const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');

// ======= GET USER ===========
router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

// ========= GET one user =========
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select({ name: 1, email: 1 });
    res.send(user);
});

// ======= CREATE USER ===========

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    // ======= Hashing Password ==========
            const salt = await bcrypt.genSalt(10);
            console.log(salt);

            user.password = await bcrypt.hash(user.password, salt);
            console.log(user.password);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});


module.exports = router;