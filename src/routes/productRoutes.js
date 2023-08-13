const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validationsProduct = require('../middlewares/validateProduct');
const validationsProductEdit = require('../middlewares/validateProductEdit');
const authMiddleware = require('../middlewares/authMiddleware');

// PRODUCTS / CART
//router.get('/productos', productControler.productsDetail)
router.get('/productos', product.list);
router.get('/productos/filter', product.filterByWord);

// router.get('/cart', authMiddleware, productControler.productsCart)


// CREATE
router.get('/productos/create', authMiddleware, product.add)
router.post("/productos/create", fileUpload.single("image"), validationsProduct, product.create)

// EDIT
router.get('/productos/edit/:id', authMiddleware, product.edit)
router.put("/productos/:id", fileUpload.single("image"), validationsProductEdit, product.update)

// DELETE
router.get("/productos/delete/:id", authMiddleware, product.delete)
router.delete("/productos/delete/:id", authMiddleware, product.destroy)





module.exports = router