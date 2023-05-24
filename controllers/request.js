const { Request } = require("../models/request");

const createRequest = async(req, res) => {
    if (req.user.role !== 's')
        return res.status(400).send({ message: 'Students only are allowed to create requests' });

    const request = new Request({...req.body });

    return await request
        .save()
        .then((reque) => res.status(200).send({ request: reque, message: 'Request created successfully' }))
        .catch((err) => res.status(500).send({ message: err.message }));
}

const updateRequest = async(req, res) => {
    const id = req.params.id;
    try {
        const request = await Request.findById(id);
        if (req.user.id != request.owner)
            return res.status(500).send({ message: "You aren't the owner of this request" })
        return request
            .set(req.body)
            .save()
            .then((request) => res.status(200).json({ request }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllRequests = async(req, res) => {
    console.log('getAllRequests')
    return await Request.find()
        .populate('owner', 'name img')
        .populate('post', '')
        .populate('postOwner', 'name img')
        .then((requests) => {
            console.log(requests)
            if (req.user.role === 's')
                requests = [...requests.filter(request => request.owner._id == req.user.id)]
            else if (req.user.role !== 'a')
                requests = [...requests.filter(request => request.postOwner._id == req.user.id)]
            console.log(requests)
            res.status(200).json({ requests })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err })
        });
}

const changeRequestState = async(req, res) => {
    if (req.user.role === 'a')
        return res.status(400).send({ message: "Students and Advertisers only are allowed to update users' requests" });

    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        if (req.user.id != request.postOwner && req.user.id != request.owner)
            return res.status(400).send({ message: "You need to be the request or the post owner" });

        return request
            .set(req.body)
            .save()
            .then((request) => res.status(200).json({ request }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deleteRequest = async(req, res) => {
    if (req.user.role === 's')
        return res.status(400).send({ message: "Students aren't allowed to delete other users' requests" });

    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        if (req.user.role !== 'a' && req.user.id !== request.owner)
            return res.status(400).send({ message: "You need to be an admin or request's owner" });

        return post.deleteOne({ _id: id })
            .then((post) => res.status(200).json({ post }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { createRequest, updateRequest, getAllRequests, changeRequestState, deleteRequest }