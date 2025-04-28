const express = require('express');
const router = express.Router();

const meController = require('../controllers/MeController');
const authMiddleware = require('../middleware/authMiddleware')

// GET /me/api/
router.get('/api/:id', meController.apiMe)

// GET /me/:id
router.get('/:id', meController.me)

// POST /me/posts
router.post('/posts', meController.posts)

// GET /me
router.use('/', meController.index)


module.exports = router;

