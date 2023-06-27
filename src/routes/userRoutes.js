const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');

const { body } = require('express-validator');


// MULTER
const path = require('path');
const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/img'))
  },
  filename: (req, file, cb) => {
      let imageName = Date.now() + file.originalname;
      cb(null, imageName);
  }
});
const fileUpload = multer({
  storage: multerDiskStorage
});




const validations = [
  body('user').notEmpty().withMessage('Debe completar el nombre de usuario'),
  body('name').notEmpty().withMessage('Debe completar el campo con su nombre'),
  body('lastName').notEmpty().withMessage('Debe completar el campo con su apellido'),
  body('email').notEmpty().withMessage('Debe completar el campo con su email'),
  body('category').notEmpty().withMessage('Debe elegir una categoria'),
  body('password').notEmpty().withMessage('Debe completar el campo con su contraseña')
]




router.get('/user/login', userControler.userLogin)
router.get('/user/list', userControler.userList)

// CREATE
router.get('/user/signup', userControler.userSignup)
router.post('/user/signup', fileUpload.single("profilePic"), validations ,userControler.userCreateProcess)


// EDIT
router.get('/user/edit/:id', userControler.userEdit)
router.put("/user/:id", userControler.userEditProcess)

// DELETE
router.delete("/user/delete/:id", userControler.userDeleteProcess)

module.exports = router