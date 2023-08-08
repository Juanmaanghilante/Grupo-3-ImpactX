const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');
const user = require('../controllers/user');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validations = require('../middlewares/validateRegister');
const validationsEditUser = require('../middlewares/validateEditUser');
const validationsLogin = require('../middlewares/validateLogin');
const guestMiddlware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const valChangePassword1 = require("../middlewares/passwordValidation1");
const valChangePassword2 = require("../middlewares/passwordValidation2");

router.get('/user/login', guestMiddlware,userControler.userLogin)
router.post('/user/login', validationsLogin, userControler.loginProcess)

router.get('/user/list', authMiddleware, userControler.userList)
router.get('/user/profile', authMiddleware, userControler.userProfile)
router.get('/user/logout', userControler.logout)


// CREATE
//router.get('/user/signup', userControler.userSignup)
//router.post('/user/signup', fileUpload.single("profilePic"), validations, userControler.userCreateProcess);
router.get('/user/signup', user.userSignup);
router.post('/user/signup', fileUpload.single("profilePic"), validations, user.userCreateProcess);

// EDIT
router.get('/user/edit/:id', authMiddleware, userControler.userEdit)
router.put("/user/:id", fileUpload.single("profilePic"), validationsEditUser, userControler.userEditProcess)

// DELETE
router.delete("/user/delete/:id", authMiddleware, userControler.userDeleteProcess)

// CHANGE PASSWORD
router.get("/user/edit/:id/changepassword", authMiddleware, userControler.passwordChange)
router.put("/user/edit/changepassword", authMiddleware, valChangePassword1, valChangePassword2, userControler.passwordChangeProcess)

module.exports = router