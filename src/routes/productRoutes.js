const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productController');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validationsProduct = require('../middlewares/validateProduct');
const authMiddleware = require('../middlewares/authMiddleware');

// PRODUCTS / CART
router.get('/productos', productControler.productsDetail)
router.get('/cart', authMiddleware, productControler.productsCart)

// CREATE
router.get('/productos/create', authMiddleware, productControler.productsCreate)
router.post("/productos/create", fileUpload.single("image"), validationsProduct, productControler.productsCreateProcess)

// EDIT
router.get('/productos/edit/:id', authMiddleware, productControler.productsEdit)

router.put("/productos/:id",fileUpload.single("nuevaImagen"), productControler.productsEditProcess)

// DELETE
router.delete("/productos/delete/:id", authMiddleware, productControler.productsDeleteProcess)

module.exports = router