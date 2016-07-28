'use strict'

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var CommentSchema = new Schema({
    content: { type: String, required: true },
    date: { type: Date, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = Mongoose.model('Comment', CommentSchema);