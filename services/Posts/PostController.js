'use strict'

const Boom = require('boom');
const Joi = require('joi');

var Post = require('./PostModel');

exports.create = {
    handler: (request, reply) => {
        let post = new Post();

        post.title = request.payload.title;
        post.date = new Date().toISOString();
        post.content = request.payload.content;
        post.creator = request.auth.credentials.id;

        post.save((err, post) => {
            if (err) { Boom.badRequest(err); }

            reply({ message: 'Post created successfuly!' }).code(201);
        });
    },
    validation: {
        payload: Joi.object({
            title: Joi.string().min(5).max(60).required(),
            content: Joi.string().min(10).required()
        })
    },
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    }
}