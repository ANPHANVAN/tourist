const express = require('express');
const router = express.Router();

const destinationController = require('../controllers/DestinationController');

// POST /destination/add-new
router.post('/add-new', destinationController.addNewPost)

// PATCH /destination/api/:id/went
router.patch('/api/:id/went', destinationController.countWentDestination)

// PATCH /destination/api/:id/like
router.patch('/api/:id/like', destinationController.countLikeDestination)

// GET /destination/add-new
router.get('/add-new', destinationController.addNew)

// GET /destination/:slug
router.get('/:slug', destinationController.detailDestination)

// GET /destination
router.use('/', destinationController.index)

module.exports = router;