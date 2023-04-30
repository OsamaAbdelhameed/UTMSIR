const express = require('express');
const { signup, login, getUser, updateProfile, deleteUser } = require('../controllers/user');
const { validateSchema, Schemas } = require('../middleware/validate');
const { authenticateToken } = require('../middleware/authrizate');

const router = express.Router();

// router.post('/signup', signup)
router.post('/signup', validateSchema(Schemas.user), signup)
router.post('/login', login)
router.get('/:id', authenticateToken, getUser)
router.put('/:id', authenticateToken, updateProfile)
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;