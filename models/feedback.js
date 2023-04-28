const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
    opinion: { type: String, required: true },
    efficient: { type: Number, required: true },
    logical: { type: Number, required: true },
    useful: { type: Number, required: true }
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = { Feedback, joiFeedbackSchema };