const express = require('express');
const { createRoom, updateRoom, getAllRooms, deleteRoom } = require('../controllers/roomRecommend');
const { createMates, updateMates, getAllMates, deleteMates } = require('../controllers/matesRecommend');
const { authenticateToken } = require('../middleware/authrizate');
const { validateSchema, Schemas } = require('../middleware/validate');
const { Room } = require("../models/roomRecommend");
const { Mates } = require("../models/matesRecommend");
const { Feedback } = require("../models/feedback");

const router = express.Router();

router.get('/', authenticateToken, getAllRooms, getAllMates)
router.post('/room', authenticateToken, validateSchema(Schemas.recommendRoom), createRoom)
router.put('/room/:id', authenticateToken, updateRoom)
router.delete('/room/:id', authenticateToken, deleteRoom)

router.post('/mates', authenticateToken, validateSchema(Schemas.recommendMates), createMates)
router.put('/mates/:id', authenticateToken, updateMates)
router.delete('/mates/:id', authenticateToken, deleteMates)

const addFeedback = async(req, res) => {
    const id = req.params.id;
    if (req.user.role !== 's')
        return res.status(400).send({ message: 'Students only are allowed to create feedback' });
    const isMates = req.body.isMates;
    console.log(isMates)

    const recommend = isMates ? await Mates.findById(id) : await Room.findById(id);
    console.log(recommend)
    console.log(req.user.id)
        // if (req.user.id != recommend.owner)
        // return res.status(500).send({ message: "You aren't the owner of this recommendation" })
    delete req.body.isMates;

    const feedback = new Feedback({...req.body });

    return await feedback
        .save()
        .then((feed) => recommend
            .set({ feedback: feed._id })
            .save()
            .then((reco) => res.status(200).send({ feed, reco, message: 'Feedback created successfully' }))
            .catch((err) => res.status(500).json({ err }))
        )
        .catch((err) => res.status(500).send({ message: err.message }));
}

router.post('/:id/add-feedback', authenticateToken, validateSchema(Schemas.feedback), addFeedback)

module.exports = router;