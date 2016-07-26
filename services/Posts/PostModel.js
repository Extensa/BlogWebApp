'use strict'

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, require: true },
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = Mongoose.model('Post', PostSchema);