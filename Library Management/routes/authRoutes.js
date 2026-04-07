const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register (for testing)
router.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hash,
        role: req.body.role
    });
    await user.save();
    res.send("User created");
});

// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.send("Wrong password");

    req.session.user = user;

    res.json({ role: user.role });
});

module.exports = router;