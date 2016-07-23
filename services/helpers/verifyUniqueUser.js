'use strict';

const Boom = require('boom');
const User = require('../UserModel');

function verifyUniqueUser(request, reply) {
  User.findOne({
    $or: [
      { email: request.payload.email },
      { username: request.payload.username }
    ]
  }, (err, user) => {
    if (user) {
      if (user.username === request.payload.username) {
        reply(Boom.badRequest('Username taken'));
      }
      if (user.email === request.payload.email) {
        reply(Boom.badRequest('Email taken'));
      }
    }
    reply(request.payload);
  });
}

module.exports = verifyUniqueUser;