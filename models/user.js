const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: Boolean, required: true },
    role: { type: String, required: true },
    img: { type: String, required: true },
    age: { type: Number, required: true },
    numOfHouses: Number,
    state: String,
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id, email: this.email, name: this.name, role: this.role }, process.env.SECRETKEY);
    return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };