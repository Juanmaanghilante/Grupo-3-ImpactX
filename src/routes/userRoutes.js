const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');


router.get('/user/login', userControler.login)
router.get('/user/signup', userControler.signup)

// EDIT
router.get('/user/edit', userControler.edit)



module.exports = router