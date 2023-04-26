const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: Boolean, required: true },
    role: { type: String, required: true },
    img: { type: String, required: true },
    age: { type: Number, required: true },
    numOfHouses: { type: Number },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        gender: Joi.string().required(),
        role: Joi.boolean().required(),
        img: Joi.string().required(),
        age: Joi.number().required(),
        numOfHouses: Joi.number(),
    });
    return schema.validate(data);
};

module.exports = { User, validate };