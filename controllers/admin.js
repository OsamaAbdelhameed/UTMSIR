const { Feedback } = require('../models/feedback');
const { Mates } = require('../models/matesRecommend');
const { Post, Comment } = require('../models/post');
const { Request } = require('../models/request');
const { Room } = require('../models/roomRecommend');
const { User } = require('../models/user');

const getAllUsers = async(req, res) => {
    const filter = {}
    if (req.user.role === 's')
        filter.role = 's'
    else if (req.user.role !== 'a')
        return res.status(400).send({ message: 'Admins only are allowed to do get all users' });

    return await User.find(filter)
        .then((users) => res.status(200).json({ users }))
        .catch((err) => res.status(500).json({ err }));
}

const changeUserState = async(req, res) => {
    if (req.user.role !== 'a')
        return res.status(400).send({ message: "Admins only are allowed to update other users' state" });

    const { id } = req.params;
    const { state } = req.body;

    return await User.updateOne({ _id: id }, {...req.body })
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
}

const getAllComments = async(req, res) => {
    if (req.user.role !== 'a')
        return res.status(400).send({ message: 'Admins only are allowed to do get all comments' });

    return await Comment.find()
        .then((comments) => res.status(200).json({ comments }))
        .catch((err) => res.status(500).json({ err }));
}

const getAllRooms = async(req, res) => {
    if (req.user.role !== 'a')
        return res.status(400).send({ message: 'Admins only are allowed to do get all Room Recommendations' });

    return await Room.find()
        .then((rooms) => res.status(200).json({ rooms }))
        .catch((err) => res.status(500).json({ err }));
}

const getAllMates = async(req, res) => {
    if (req.user.role !== 'a')
        return res.status(400).send({ message: 'Admins only are allowed to do get all Mates Recommendations' });

    return await Mates.find()
        .then((mates) => res.status(200).json({ mates }))
        .catch((err) => res.status(500).json({ err }));
}


const getAllFeedbacks = async(req, res) => {
    if (req.user.role !== 'a')
        return res.status(400).send({ message: 'Admins only are allowed to do get all Feedbacks' });

    return await Feedback.find()
        .then((feedbacks) => res.status(200).json({ feedbacks }))
        .catch((err) => res.status(500).json({ err }));
}

const getCount = async(req, res) => {
    if (req.user.role !== 'a')
        return res.status(400).send({ message: 'Admins only are allowed to do get all Counts' });
    try {
        // Query the model to get the count
        const countUser = await User.countDocuments();
        const countPost = await Post.countDocuments();
        // const countComment = await Comment.countDocuments();
        const countRequest = await Request.countDocuments();
        const countMates = await Mates.countDocuments();
        const countRoom = await Room.countDocuments();
        const countFeedback = await Feedback.countDocuments();

        // Send the count as a response
        res.status(200).json({ counts: [{ name: "User", value: countUser }, { name: "Post", value: countPost }, { name: "Request", value: countRequest }, { name: "Recommend Room", value: countRoom }, { name: "Recommend Mates", value: countMates }, { name: "Feedback", value: countFeedback }] });
    } catch (error) {
        // Handle any errors that occur
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving the count.' });
    }
};

module.exports = { getAllUsers, changeUserState, getAllComments, getAllRooms, getAllMates, getAllFeedbacks, getCount }