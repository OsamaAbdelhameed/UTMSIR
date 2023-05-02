const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Comment = mongoose.model('CommentEmbed', commentSchema)

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    location: { type: String, required: true },
    imgs: { type: [String], required: true },
    price: { type: Number, required: true },
    bedsNum: { type: Number, required: true },
    area: { type: Number, required: true },
    numOfReqs: { type: Number, required: true },
    comments: { type: [commentSchema], required: true },
    state: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = { Comment, Post };