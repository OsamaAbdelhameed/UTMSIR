const bcrypt = require('bcrypt');
const { User } = require('../models/user');

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
        res.status(500).json({ error })
    }
}

// signup function
const signup = async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = firstName + ' ' + lastName;

        const existed = await User.findOne({ email })

        if (existed)
            return res.status(500).send({ message: 'Email already exists' })

        const user = new User({...req.body, name, password: hashedPassword });

        return await user.save()
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(500).json({ err }));;
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getUser = async(req, res) => {
    const id = req.params.id;
    if (req.user.id !== id)
        return res.status(400).send({ message: "You aren't the owner of this profile" });

    return await User.findOne({ _id: id })
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
}

const updateProfile = async(req, res) => {
    try {
        const { id } = req.params;

        if (req.user.id !== id)
            return res.status(400).send({ message: "You aren't the owner of this profile" });

        const user = await User.findOne({ _id: id })
        if (!user)
            return res.status(400).send({ message: "User does not Existed!" });

        return await User.updateOne({ _id: id }, {...req.body })
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).json({ err })
    }
}

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;

        if (req.user.id !== id)
            return res.status(400).send({ message: "You aren't the owner of this profile" });

        const user = await User.findOne({ _id: id })
        if (!user)
            return res.status(400).send({ message: "User does not Existed!" });

        return await User.deleteOne({ _id: id })
            .then((user) => res.status(200).json({ user }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).json({ err })
    }
}

module.exports = { signup, login, getUser, updateProfile, deleteUser }