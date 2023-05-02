const express = require('express');
const { createRequest, updateRequest, changeRequestState, getAllRequests, deleteRequest } = require('../controllers/request');
const { authenticateToken } = require('../middleware/authrizate');
const { validateSchema, Schemas } = require('../middleware/validate');

const router = express.Router();

router.get('/', authenticateToken, getAllRequests)
router.post('/', authenticateToken, validateSchema(Schemas.request), createRequest)
router.put('/:id', authenticateToken, updateRequest)
router.patch('/:id', authenticateToken, changeRequestState)
router.delete('/:id', authenticateToken, deleteRequest)

module.exports = router;