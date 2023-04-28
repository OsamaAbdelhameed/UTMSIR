const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { Logging } = require("../library/logging");

export const validateSchema = (schema) => {
    return async(req, res, next) => {
        try {
            delete req.body._id;
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            Logging.err(err);
            return res.status(422).json({ err });
        }
    };
};

const Schemas = {
    user: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        gender: Joi.string().required(),
        role: Joi.boolean().required(),
        img: Joi.string().required(),
        age: Joi.number().required(),
        numOfHouses: Joi.number(),
    }),
    post: Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        location: Joi.string().required(),
        imgs: Joi.array().items(Joi.string()).required(),
        price: Joi.number().required(),
        bedsNum: Joi.number().required(),
        area: Joi.number().required(),
        numOfReqs: Joi.number().required(),
        comments: Joi.array().items(this.comment).required(),
        owner: Joi.string().required(),
    }),
    comment: Joi.object({
        img: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
    request: Joi.object({
        desc: Joi.string().required(),
        price: Joi.string().required(),
        status: Joi.string().required(),
        arrivalDate: Joi.string().required(),
        owner: Joi.string().required(),
        post: Joi.string().required(),
    }),
    recommendRoom: Joi.object({
        name: Joi.string().required(),
        area: Joi.number().required(),
        budget: Joi.number().required(),
        hasTransport: Joi.boolean().required(),
        isInsideUTM: Joi.boolean().required(),
        matesInsideRoom: Joi.boolean().required(),
        privateBath: Joi.boolean().required(),
        type: Joi.string(),
        owner: Joi.string().required(),
        feedback: Joi.string(),
    }),
    recommendMates: Joi.object({
        religion: Joi.string().required(),
        lang: Joi.array().items(string).required(),
        expectedBudget: Joi.number().required(),
        field: Joi.boolean().required(),
        sameReligion: Joi.boolean().required(),
        smoking: Joi.boolean().required(),
        vaping: Joi.boolean().required(),
        options: Joi.array().items(string),
        owner: Joi.string().required(),
        feedback: Joi.string(),
    }),
    feedback: Joi.object({
        opinion: Joi.string().required(),
        efficient: Joi.number().required(),
        logical: Joi.number().required(),
        useful: Joi.number().required(),
    })
};

module.exports = { validateSchema, Schemas };