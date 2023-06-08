const express = require('express');
const { createRoom, updateRoom, getAllRooms, deleteRoom } = require('../controllers/roomRecommend');
const { createMates, updateMates, getAllMates, deleteMates } = require('../controllers/matesRecommend');
const { authenticateToken } = require('../middleware/authrizate');
const { validateSchema, Schemas } = require('../middleware/validate');

const router = express.Router();

router.get('/', authenticateToken, getAllRooms, getAllMates)
router.post('/room', authenticateToken, validateSchema(Schemas.recommendRoom), createRoom)
router.put('/room/:id', authenticateToken, updateRoom)
router.delete('/room/:id', authenticateToken, deleteRoom)

router.post('/mates', authenticateToken, validateSchema(Schemas.recommendMates), createMates)
router.put('/mates/:id', authenticateToken, updateMates)
router.delete('/mates/:id', authenticateToken, deleteMates)

module.exports = router;