const mongoose = require("mongoose");
const Joi = require("joi");

const requestSchema = new mongoose.Schema({
    desc: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Request = mongoose.model('Request', requestSchema)

const validate = (data) => {
    const joiRequestSchema = Joi.object({
        desc: Joi.string().required(),
        price: Joi.string().required(),
        status: Joi.string().required(),
        arrivalDate: Joi.string().required(),
        owner: Joi.string().required(),
        post: Joi.string().required(),
    });
    return joiRequestSchema.validate(data);
};

module.exports = { Request, validate };