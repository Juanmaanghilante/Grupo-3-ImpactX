const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');


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



router.get('/user/login', userControler.userLogin)
router.get('/user/list', userControler.userList)

// CREATE
router.get('/user/signup', userControler.userSignup)
router.post('/user/signup', fileUpload.single("profilePic"), userControler.userCreateProcess)


// EDIT
router.get('/user/edit/:id', userControler.userEdit)
router.put("/user/:id", userControler.userEditProcess)

// DELETE
router.delete("/user/delete/:id", userControler.userDeleteProcess)

module.exports = router