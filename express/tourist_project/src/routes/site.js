const express = require('express');
const router = express.Router();

const siteController = require('../controllers/SiteController');
const { query } = require('../config/db/postgres');
const route = require('.');
// [GET] /
router.get('/health', (req, res) => {
    res.status(200).send('OK');
});
router.use('/', siteController.index)

module.exports = router;