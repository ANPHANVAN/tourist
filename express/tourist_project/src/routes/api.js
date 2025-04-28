const express = require('express');
const router = express.Router();

const apiController = require('../controllers/ApiController');

// GET /api/user/all-user
router.get('/user/all-user', apiController.apiAllUser)

// GET /api/post/all-post
router.get('/post/all-post', apiController.apiAllPost)

module.exports = router