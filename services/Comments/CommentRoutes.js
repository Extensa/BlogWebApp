'use strict'

var CommentController = require('./CommentController');

exports.endpoints = [
    { method: 'POST', path: '/api/posts/{postId}/comments', config: CommentController.create }
]
