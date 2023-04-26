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
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }
})

const Room = mongoose.model('Room', roomSchema)

const validate = (data) => {
    const joiRoomSchema = Joi.object({
        name: Joi.string().required(),
        area: Joi.number().required(),
        budget: Joi.number().required(),
        hasTransport: Joi.boolean().required(),
        isInsideUTM: Joi.boolean().required(),
        matesInsideRoom: Joi.boolean().required(),
        privateBath: Joi.boolean().required(),
        type: Joi.string(),
        feedback: Joi.string(),
    });
    return joiRoomSchema.validate(data);
};

module.exports = { Room, validate };