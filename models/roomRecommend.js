const mongoose = require("mongoose");
const Joi = require("joi");

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: Number, required: true },
    budget: { type: Number, required: true },
    hasTransport: { type: Boolean, required: true },
    isInsideUTM: { type: Boolean, required: true },
    matesInsideRoom: { type: Boolean, required: true },
    privateBath: { type: Boolean, required: true },
    type: String,
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