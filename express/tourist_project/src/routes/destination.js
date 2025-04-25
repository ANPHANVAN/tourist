const express = require('express');
const router = express.Router();

const destinationController = require('../controllers/DestinationController');
const { query } = require('../config/db/postgres');

// POST /destination/add-new
router.post('/add-new', destinationController.addNewPost)

// GET /destination/add-new
router.get('/add-new', destinationController.addNew)

// GET /destination/:slug
router.get('/:slug', destinationController.detailDestination)

// GET /destination
router.use('/', destinationController.index)

module.exports = router;