'use strict'

const Boom = require('boom');
const Joi = require('joi');

var Comment = require('./CommentModel'),
    Post = require('../Posts/PostModel');

exports.create = {
    handler: (request, reply) => {
        let postId = request.params.postId;
        
        Post.findById(postId, (err, post) => {
            if (err) { reply(Boom.badRequest(err)); }

            if (post) {
                var comment = new Comment();

                comment.content = request.payload.content;
                comment.date = new Date().toISOString();
                comment.creator = request.auth.credentials.id;
                comment.post = postId;

                comment.save((err, comment) => {
                    if (err) { reply(Boom.badRequest(err)); }
                    
                    post.comments.push(comment._id);
                    post.save();
                    
                    reply(comment).code(201);
                })
            } else {
                reply(Boom.badRequest('The post you are thrying to comment does not exist!'));
            }
        });
    },
    validate: {
        payload: Joi.object({
            content: Joi.string().min(3).required()
        })
    },
    auth: {
        strategy: 'jwt'
    }
}