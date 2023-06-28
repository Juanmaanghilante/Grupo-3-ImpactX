const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: function(req, file, cb){
        let imageName = Date.now() + file.originalname;
        cb(null, imageName);
    }
});

const fileUpload = multer({
    storage: multerDiskStorage
});

// PRODUCTS / CART
router.get('/productos', productControler.productsDetail)
router.get('/cart', productControler.productsCart)

// CREATE
router.get('/productos/create', productControler.productsCreate)
router.post("/productos/create", fileUpload.single("image"), productControler.productsCreateProcess)

// EDIT
router.get('/productos/edit/:id', productControler.productsEdit)

router.put("/productos/:id",fileUpload.single("nuevaImagen"), productControler.productsEditProcess)

// DELETE
router.delete("/productos/delete/:id", productControler.productsDeleteProcess)

module.exports = router