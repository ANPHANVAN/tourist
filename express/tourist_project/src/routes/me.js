const express = require('express');
const router = express.Router();

const meController = require('../controllers/MeController');
const authMiddleware = require('../middleware/authMiddleware')

// GET /me/api/
router.use('/api/:id', meController.apiMe)

// GET /me/:id
router.get('/:id', meController.me)

// GET /me
router.use('/', meController.index)


module.exports = router;