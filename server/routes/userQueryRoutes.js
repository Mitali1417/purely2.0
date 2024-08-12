const express = require('express');
const router = express.Router();
const { submitQuery } = require('../controllers/userQueryController');

router.post('/submit', submitQuery);

module.exports = router;
