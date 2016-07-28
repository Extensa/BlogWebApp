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
                reply(Boom.notFound('The post you are thrying to comment does not exist!'));
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

exports.edit = {
    handler: (request, reply) => {
        let postId = request.params.postId,
            commentId = request.params.commentId;

        Post.findById(postId, (err, post) => {
            if (err) { reply(Boom.badRequest(err)); }

            if (post) {
                Comment.findById(commentId, (err, comment) => {
                    if (err) { reply(Boom.badRequest(err)); }

                    if (comment) {
                        var credentials = request.auth.credentials,
                            canEdit = credentials.id === comment.creator ||
                                      credentials.scope === 'admin' ||
                                      credentials.scope === 'manager';

                        if (canEdit) {
                            comment.content = request.payload.content;
                            comment.save((err, comment) => {
                                if (err) { reply(Boom.badRequest(err)); }

                                reply({ message: 'Comment edited successfuly!' });
                            });

                        } else {
                            reply(Boom.forbidden('You don\'t have permission to edit this comment.'));
                        }
                    } else {
                        reply(Boom.notFound('The comment you are trying to edit does not exist!'));
                    }
                });
            } else {
                reply(Boom.notFound('The post you are searching for does not exist!'));
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

exports.remove = {
    handler: (request, reply) => {
        let postId = request.params.postId,
            commentId = request.params.commentId;
        
        Post.findById(postId, (err, post) => {
            if (err) { reply(Boom.badRequest(err)); }

            if (post) {
                Comment.findById(commentId, (err, comment) => {
                    if (err) { reply(Boom.badRequest(err)); }

                    if (comment) {
                        var credentials = request.auth.credentials,
                            canDelete = credentials.id === comment.creator ||
                                        credentials.scope === 'admin' ||
                                        credentials.scope === 'manager';

                        if (canDelete) {
                            comment.remove((err) => {
                                if (err) { reply(Boom.badRequest(err)); }

                                var commentIndex = post.comments.indexOf(comment._id);
                                post.comments.splice(commentIndex, 1);

                                reply({ message: 'Comment deleted successfuly!' });
                            });
                        } else {
                            reply(Boom.forbidden('You don\'t have permission to edit this comment.'));
                        }
                    } else {
                        reply(Boom.notFound('The comment you are trying to edit does not exist!'));
                    }
                });
            } else {
                reply(Boom.notFound('The post you are searching for does not exist!'));
            }
        });
    },
    auth: {
        strategy: 'jwt'
    }
}