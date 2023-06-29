const mongoose = require("mongoose");
const Joi = require("joi");

const matesSchema = new mongoose.Schema({
    religion: { type: String, required: true },
    lang: { type: [String], required: true },
    expectedBudget: { type: Number, required: true },
    myBudget: { type: Number, required: true },
    field: { type: Boolean, required: true },
    sameReligion: { type: Boolean, required: true },
    vaping: { type: Boolean, required: true },
    smoking: { type: Boolean, required: true },
    options: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: { type: String },
        similarity: { type: Number, required: true },
        attributes: {}
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    },
    state: String
})

const Mates = mongoose.model('Mates', matesSchema)

module.exports = { Mates };