const express = require('express');
const router = express.Router();

const siteController = require('../controllers/SiteController');
const { query } = require('../config/db/postgres');
// [GET] /
router.use('/', siteController.index )


module.exports = router;
