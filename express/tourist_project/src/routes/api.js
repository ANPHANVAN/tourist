const express = require('express');
const router = express.Router();

const apiController = require('../controllers/ApiController');

// GET /api/user/all-user
router.get('/user/all-user', apiController.apiAllUser)

// GET /api/post/all-post
router.get('/post/all-post', apiController.apiAllPost)

// GET /api/post/user-post/:user_id
router.get('/post/user-post/:id', apiController.apiUserPost)

// GET /api/users/:id
router.get('/users/:id', apiController.apiOneUser)

// GET /api/user-current  take user current
router.get('/user-current', apiController.apiUserCurrent)

// POST /api/posts/:postId/comment
router.post('/posts/:postId/comment', apiController.apiPostComment)

// multi POST/PUT /api/posts/:postId/like  add user like to post / unlike and remove user like
router.post('/posts/:postId/like', apiController.apiPostPOSTLike)



module.exports = router