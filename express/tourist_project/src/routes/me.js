const express = require('express');
const router = express.Router();

const meController = require('../controllers/MeController');
const authMiddleware = require('../middleware/authMiddleware')

// GET /me/:id
router.get('/:id', meController.me)

// GET /me/:id/edit
router.get('/:id/edit', meController.meGetEdit)

// POST /me/api/:id/edit
router.post('/api/:id/edit', meController.mePostEdit)

// GET /me/api/:id/edit
router.get('/api/:id/edit', meController.meGetEditApi)


// POST /me/posts
router.post('/posts', meController.posts)

// GET /me
router.use('/', meController.index)


module.exports = router;

