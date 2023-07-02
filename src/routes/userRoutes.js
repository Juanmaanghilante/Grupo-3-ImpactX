const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validations = require('../middlewares/validateRegister');


router.get('/user/login', userControler.userLogin)
router.post('/user/login', userControler.loginProcess)

router.get('/user/list', userControler.userList)
router.get('/user/profile', userControler.userProfile)


// CREATE
router.get('/user/signup', userControler.userSignup)
router.post('/user/signup', fileUpload.single("profilePic"), validations, userControler.userCreateProcess)

// EDIT
router.get('/user/edit/:id', userControler.userEdit)
router.put("/user/:id", fileUpload.single("profilePic"), validations, userControler.userEditProcess)

// DELETE
router.delete("/user/delete/:id", userControler.userDeleteProcess)

module.exports = router