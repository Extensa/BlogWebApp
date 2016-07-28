'use strict'

const Boom = require('boom');
const Joi = require('joi');
var hashPassword = require('../helpers/hashPassword'),
    tokenGenerator = require('../helpers/tokenGenerator'),
    verifyUniqueUser = require('../helpers/verifyUniqueUser'),
    verifyCredentials = require('../helpers/verifyCredentials'),
    User = require('./UserModel');

exports.register = {
    pre: [{ method: verifyUniqueUser }],
    handler: (request, reply) => {
        let user = new User();
        user.username = request.payload.username;
        user.email = request.payload.email;
        user.admin = false;
        user.blogManager = true;
        
        hashPassword(request.payload.password, (err, hash) => {
            if (err) { Boom.badRequest(err);}
            user.password = hash;
            user.save((err, user) => {
                if (err) { Boom.badRequest(err); }

                reply({ access_token: tokenGenerator(user) }).code(201);
            });
        });
    },
    validate: {
        payload: Joi.object({
            username: Joi.string().alphanum().min(2).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}

exports.login = {
    pre: [{ method: verifyCredentials, assign: 'user' }],
    handler: (request, reply) => {
        reply({ access_token: tokenGenerator(request.pre.user) }).code(200);
    },
    validate: {
        payload: Joi.object({
            username: Joi.string().alphanum().min(2).max(30).required(),
            password: Joi.string().required()
        })
    }
}

exports.changePassword = {
    handler: (request, reply) => {
        var userId = request.auth.credentials.id;

        User.findById(userId, (err, user) => {
            if (err) { Boom.badRequest(err) }
            else if (user) {
                hashPassword(request.payload.password, (err, hash) => {
                    if (err) { reply(Boom.badRequest(err)); }

                    user.password = hash;
                    user.save((err) => {
                        if (err) { reply(Boom.badRequest(err)); }
                        else { reply({ message: 'Your password have been changed successfuly!' }).code(200); }
                    })
                })
            }
        });
    },
    validate: {
        payload: Joi.object({
            password: Joi.string().required()
        })
    },
    auth: {
        strategy: 'jwt'
    }
}