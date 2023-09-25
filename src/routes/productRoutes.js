const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validationsProduct = require('../middlewares/validateProduct');
const validationsProductEdit = require('../middlewares/validateProductEdit');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware")

// PRODUCTS
router.get('/productos', productController.list);
router.get('/productos/filter', productController.filterByWord);

// CREATE
router.get('/productos/create', authMiddleware,adminMiddleware, productController.add)
router.post("/productos/create", fileUpload.single("image"), validationsProduct, productController.create)

// EDIT
router.get('/productos/edit/:id', authMiddleware,adminMiddleware, productController.edit)
router.put("/productos/:id", fileUpload.single("image"), validationsProductEdit, productController.update)

// DELETE
router.delete("/productos/delete/:id", authMiddleware,adminMiddleware, productController.destroy)

//CART
router.get('/cart',  productController.productsCart)
router.post('/cart/done', authMiddleware, productController.buyProcess)

module.exports = router