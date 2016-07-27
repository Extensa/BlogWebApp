'use strict'

var PostController = require('./PostController');

exports.endpoints = [
    { method: 'POST', path: '/api/posts', config: PostController.create },
    { method: 'GET', path: '/api/posts', config: PostController.getAll },
    { method: 'GET', path: '/api/posts/{postId}', config: PostController.getById }
]
