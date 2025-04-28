const express = require('express');
const router = express.Router();

const ExploreController = require('../controllers/ExploreController');
// [GET] /explore
router.use('/', ExploreController.index)

module.exports = router;