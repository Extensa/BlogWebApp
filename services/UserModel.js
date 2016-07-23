'use strict'

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

module.exports = Mongoose.model('User', UserSchema);

