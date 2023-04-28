const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../models/user');

require('dotenv').config();

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).send({ message: "Email is not Existed!" });

        const success = await bcrypt.compare(password, user.password);
        if (!success) {
            res.status(400).send({ message: 'Incorrect password' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ token, message: "logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// signup function
const signup = async(req, res) => {
    try {
        const { firstName, lastName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = firstName + ' ' + lastName;

        const user = new User({...req.body, name, password: hashedPassword });

        return await user.save()
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(500).json({ message: err }));;
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const updateProfile = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ id })
        if (!user)
            return res.status(400).send({ message: "User does not Existed!" });

        return await User.updateOne({ id }, {...req.body })
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const deleteUser = async(req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findOne({ id })
        if (!user)
            return res.status(400).send({ message: "User does not Existed!" });

        return await User.deleteOne({ id })
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const signupG = async(req, res) => { res.send('Hello, World! in signup'); }
const loginG = async(req, res) => { res.send('Hello, World! in login'); }

// export login and signup
module.exports = { signup, login, updateProfile, deleteUser }