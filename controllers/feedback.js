import { Feedback } from "../models/feedback";

const createFeedback = async(req, res) => {
    if (req.user.role !== 's')
        return res.status(400).send({ message: 'Students only are allowed to create Feedbacks' });

    const feedback = new Feedback({...req.body });

    return await feedback
        .save()
        .then((r) => res.status(200).send({ r, message: 'Feedback created successfully' }))
        .catch((err) => res.status(500).send({ message: err.message }));
}

const updateFeedback = async(req, res) => {
    const id = req.params.id;
    try {
        const feedback = await Feedback.findById(id);
        if (req.user.id != feedback.owner)
            return res.status(500).send({ message: "You aren't the owner of this Feedbacks" })
        return feedback
            .set(req.body)
            .save()
            .then((m) => res.status(200).json({ m }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllFeedbacks = async(req, res) => {
    return await Feedback.find()
        .then((m) => {
            console.log(m)
            if (req.user.role === 's')
                m = [...m.filter(m => m.owner._id == req.user.id)]
            console.log(m)
            res.status(200).json({ m })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err })
        });
}

const deleteFeedback = async(req, res) => {
    try {
        const { id } = req.params;
        const m = await Feedback.findById(id);

        if (req.user.role !== 'a' && req.user.id !== m.owner)
            return res.status(400).send({ message: "You need to be an admin or request's owner" });
        if (req.user.role === 's' && req.user.id !== m.owner)
            return res.status(400).send({ message: "Users aren't allowed to delete other users' requests" });

        return m.deleteOne({ _id: id })
            .then((m) => res.status(200).json({ m }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { createFeedback, updateFeedback, getAllFeedbacks, deleteFeedback }