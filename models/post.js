const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema);

const joiCommentSchema = Joi.object({
    img: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
});

const validateComment = (data) => joiCommentSchema.validate(data);

const validatePost = (data) => {
    const joiPostSchema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        location: Joi.string().required(),
        imgs: Joi.array().items(Joi.string()).required(),
        price: Joi.number().required(),
        bedsNum: Joi.number().required(),
        area: Joi.number().required(),
        numOfReqs: Joi.number().required(),
        comments: Joi.array().items(joiCommentSchema).required(),
        owner: Joi.string().required(),
    });
    return joiPostSchema.validate(data);
};

module.exports = { Comment, Post, validateComment, validatePost };