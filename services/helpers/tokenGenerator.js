'use strict'

const jwt = require('jsonwebtoken');
const secretKey = require('../config');

function tokenGenerator(user) {
    let scopes;

    if (user.admin) {
        scopes = 'admin';
    }

    return jwt.sign(
        { id: user._id, username: user.username, scope: scopes },
        secretKey,
        { algorithm: 'HS256', expiresIn: "1h" });
}

module.exports = tokenGenerator;