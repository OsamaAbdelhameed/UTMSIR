const express = require('express');

const { getAllUsers, changeUserState, getAllComments, getAllRooms, getAllMates, getAllFeedbacks, getCount } = require('../controllers/admin');
const { getAllPosts, changePostState } = require('../controllers/post');
const { getAllRequests } = require('../controllers/request');
const { authenticateToken } = require('../middleware/authrizate');

const router = express.Router();

router.get('/all-users', authenticateToken, getAllUsers)
router.patch('/user/:id', authenticateToken, changeUserState)
router.get('/all-posts', authenticateToken, getAllPosts)
router.patch('/post/:id', authenticateToken, changePostState)
router.get('/all-comments', authenticateToken, getAllComments)
router.get('/all-requests', authenticateToken, getAllRequests)
router.get('/all-rooms', authenticateToken, getAllRooms)
router.get('/all-mates', authenticateToken, getAllMates)
router.get('/all-feeds', authenticateToken, getAllFeedbacks)
router.get('/all-count', authenticateToken, getCount)

module.exports = router;