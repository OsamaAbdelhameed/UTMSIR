const express = require('express');
const { createPost, updatePost, changePostState, getAllPosts, deletePost, addComment } = require('../controllers/post');
const { authenticateToken } = require('../middleware/authrizate');
const { validateSchema, Schemas } = require('../middleware/validate');

const router = express.Router();

router.get('/', authenticateToken, getAllPosts)
router.post('/', authenticateToken, validateSchema(Schemas.post), createPost)
router.post('/:id/add-comment', authenticateToken, validateSchema(Schemas.comment), addComment)
router.put('/:id', authenticateToken, updatePost)
router.patch('/:id', authenticateToken, changePostState)
router.delete('/:id', authenticateToken, deletePost)

module.exports = router;