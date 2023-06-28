const express = require('express');
const router = express.Router();
const productControler = require('../controllers/mainController');

router.get('/', productControler.index)

module.exports = router