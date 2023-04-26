const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
    opinion: { type: String, required: true },
    efficient: { type: Number, required: true },
    logical: { type: Number, required: true },
    useful: { type: Number, required: true }
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

const joiFeedbackSchema = Joi.object({
    opinion: Joi.string().required(),
    efficient: Joi.number().required(),
    logical: Joi.number().required(),
    useful: Joi.number().required(),
});

const validate = (data) => joiFeedbackSchema.validate(data);

module.exports = { Feedback, joiFeedbackSchema, validate };