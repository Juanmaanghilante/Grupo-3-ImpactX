const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');


router.get('/user/login', userControler.userLogin)
router.get('/user/signup', userControler.userSignup)

// CREATE
router.post('/user/create', userControler.userCreate)
router.get("/user", userControler.userCreateProcess)

// EDIT
router.get('/user/edit/id', userControler.userEdit)
router.put("/user/:id", userControler.userEditProcess)

// DELETE
router.delete("/user/:id", userControler.userDeleteProcess)

module.exports = router