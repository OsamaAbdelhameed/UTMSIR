const mongoose = require("mongoose");
const Joi = require("joi");

const roomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    budget: { type: Number, required: true },
    hasTransport: { type: Boolean, required: true },
    isInsideUTM: { type: Boolean, required: true },
    matesInsideRoom: { type: Boolean, required: true },
    name: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }
})

const Room = mongoose.model('Room', roomSchema)

module.exports = { Room };