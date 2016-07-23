'use strict'

const jwt = require('jsonwebtoken');
const secretKey = require('../config');

function tokenGenerator(user) {
    return jwt.sign(
        { id: user._id, username: user.username },
        secretKey,
        { algorithm: 'HS256', expiresIn: "1h" });
}

module.exports = tokenGenerator;