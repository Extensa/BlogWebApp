'use strict'

var UserController = require('./UserController');

exports.endpoints = [
    { method: 'POST', path: '/api/users', config: UserController.register }   
];