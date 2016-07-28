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

            reply(post).code(201);
        });
    },
    validate: {
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

exports.getAll = {
    handler: (request, reply) => {
        Post.find({}, (err, posts) => {
            if (err) { reply(Boom.badRequest(err)); }

            if (posts) {
                reply(posts);
            } else {
                reply(Boom.badRequest('There are no posts!'));
            }
        }).populate({ path: 'creator', select: 'username' });
    }
}

exports.getById = {
    handler: (request, reply) => {
        var postId = request.params.postId;

        Post.findById(postId, (err, post) => {
            if (err) { reply(Boom.badRequest(err)); }

            if (post) {
                reply(post);
            } else {
                reply(Boom.badRequest('There is no such post!'));
            }
        })
            .populate({ path: 'creator', select: 'username' })
            .populate({
                path: 'comments',
                select: 'date content creator',
                populate: { path: 'creator', select: 'username' }
            });
    }
}

exports.edit = {
    handler: (request, reply) => {
        var postId = request.params.postId;

        Post.findById(postId, (err, post) => {
            if (err) { reply(Boom.badRequest(err)); }

            if (post) {
                post.title = request.payload.title;
                post.content = request.payload.content;

                post.save((err, post) => {
                    if (err) { reply(Boom.badRequest(err)); }

                    reply({ message: 'Post is updated successfuly!' })
                })
            } else {

            }
        });
    },
    validate: {
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