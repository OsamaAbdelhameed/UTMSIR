const { Room } = require("../models/roomRecommend");

const createRoom = async(req, res) => {
    if (req.user.role !== 's')
        return res.status(400).send({ message: 'Students only are allowed to create room recommendations' });

    const room = new Room({...req.body, owner: req.user.id });

    return await room
        .save()
        .then((r) => res.status(200).send({ r, message: 'Room created successfully' }))
        .catch((err) => res.status(500).send({ message: err.message }));
}

const updateRoom = async(req, res) => {
    const id = req.params.id;
    try {
        const room = await Room.findById(id);
        if (req.user.id != room.owner)
            return res.status(500).send({ message: "You aren't the owner of this room recommendations" })
        return room
            .set(req.body)
            .save()
            .then((room) => res.status(200).json({ room }))
            .catch((err) => res.status(500).json({ err }))
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAllRooms = async(req, res, next) => {
    const rooms = await Room.find()
        .populate('owner', 'name img')
        .populate('feedback', '')
        .then((rooms) => {
            console.log(rooms)
            if (req.user.role === 's')
                rooms = [...rooms.filter(room => room.owner._id == req.user.id)]
            console.log(rooms)
            return rooms;
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err })
        });

    req.rooms = rooms;
    next();
}

const deleteRoom = async(req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);

        if (req.user.role !== 'a' && req.user.id !== room.owner)
            return res.status(400).send({ message: "You need to be an admin or request's owner" });
        if (req.user.role === 's' && req.user.id !== room.owner)
            return res.status(400).send({ message: "Users aren't allowed to delete other users' requests" });

        return room.deleteOne({ _id: id })
            .then((room) => res.status(200).json({ room }))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { createRoom, updateRoom, getAllRooms, deleteRoom }