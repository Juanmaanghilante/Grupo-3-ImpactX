const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');


router.get('/login', userControler.login)
router.get('/signup', userControler.signup)

// EDIT
router.get('/edit', userControler.edit)



module.exports = router