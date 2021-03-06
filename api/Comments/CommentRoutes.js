'use strict'

var CommentController = require('./CommentController');

exports.endpoints = [
    { method: 'POST', path: '/api/posts/{postId}/comments', config: CommentController.create },
    { method: 'PUT', path: '/api/posts/{postId}/comments/{commentId}', config: CommentController.edit },
    { method: 'DELETE', path: '/api/posts/{postId}/comments/{commentId}', config: CommentController.remove }
]
