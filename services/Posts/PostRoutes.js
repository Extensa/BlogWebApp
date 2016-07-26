'use strict'

var PostController = require('./PostController');

exports.endpoints = [
    { method: 'POST', path: '/api/posts', config: PostController.create }
]
