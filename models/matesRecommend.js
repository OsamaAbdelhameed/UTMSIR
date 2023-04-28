const mongoose = require("mongoose");
const Joi = require("joi");

const matesSchema = new mongoose.Schema({
    religion: { type: String, required: true },
    lang: { type: [String], required: true },
    expectedBudget: { type: Number, required: true },
    field: { type: Boolean, required: true },
    sameReligion: { type: Boolean, required: true },
    vaping: { type: Boolean, required: true },
    smoking: { type: Boolean, required: true },
    options: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }
})

const Mates = mongoose.model('Mates', matesSchema)

module.exports = { Mates };