'use strict'

const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/Blog');

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database established!");
});

exports.Mongoose = Mongoose;
exports.db = db;