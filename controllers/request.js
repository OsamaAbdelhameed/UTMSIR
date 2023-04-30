const { Request } = require("../models/request");

const getAllRequests = async(req, res) => {
    return await Request.find()
        .then((requests) => {
            if (req.user.role === 's')
                requests = [...requests.filter(request => request.owner === req.user.id)]
            else if (req.user.role !== 'a')
                requests = [...requests.filter(request => request.postOwner === req.user.id)]
            res.status(200).json({ requests })
        })
        .catch((err) => res.status(500).json({ err }));
}

const changeRequestState = async(req, res) => {
    if (req.user.role === 'a')
        return res.status(400).send({ message: "Students and Advertisers only are allowed to update users' requests" });

    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        if (req.user.id !== request.postOwner && req.user.id !== request.owner)
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


module.exports = { getAllRequests, changeRequestState }