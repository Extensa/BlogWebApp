const User = require('../Users/UserModel');
const Boom = require('boom');
const bcrypt = require('bcrypt');

function verifyCredentials(request, reply) {
    const password = request.payload.password;

    User.findOne({
        $or: [
            { email: request.payload.email },
            { username: request.payload.username }
        ]
    }, (err, user) => {
        if (err) {
            reply(Boom.badRequest(err));
        } else if (user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (isValid) { reply(user); }
                else { reply(Boom.badRequest('Incorrect password!')); }
            });
        } else {
            reply(Boom.badRequest('Incorrect username or email!'))
        }
    });
}

module.exports = verifyCredentials;