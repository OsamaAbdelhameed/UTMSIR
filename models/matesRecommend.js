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
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }
})

const Mates = mongoose.model('Mates', matesSchema)

const validate = (data) => {
    const joiMatesSchema = Joi.object({
        religion: Joi.string().required(),
        lang: Joi.array().items(string).required(),
        expectedBudget: Joi.number().required(),
        field: Joi.boolean().required(),
        sameReligion: Joi.boolean().required(),
        smoking: Joi.boolean().required(),
        vaping: Joi.boolean().required(),
        options: Joi.array().items(string),
        feedback: Joi.string(),
    });
    return joiMatesSchema.validate(data);
};

module.exports = { Mates, validate };