const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productController');
const product = require('../controllers/product');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validationsProduct = require('../middlewares/validateProduct');
const validationsProductEdit = require('../middlewares/validateProductEdit');
const authMiddleware = require('../middlewares/authMiddleware');

// PRODUCTS / CART
//router.get('/productos', productControler.productsDetail)
router.get('/productos', product.list);
router.get('/cart', authMiddleware, productControler.productsCart)

// CREATE
//router.get('/productos/create', authMiddleware, productControler.productsCreate)
//router.post("/productos/create", fileUpload.single("image"), validationsProduct, productControler.productsCreateProcess)
router.get('/productos/create', authMiddleware, product.add)
router.post("/productos/create", fileUpload.single("image"), validationsProduct, product.create)

// EDIT
router.get('/productos/edit/:id', authMiddleware, productControler.productsEdit)
router.put("/productos/:id", fileUpload.single("image"), validationsProductEdit, productControler.productsEditProcess)

// DELETE
router.delete("/productos/delete/:id", authMiddleware, productControler.productsDeleteProcess)







// NUEVO ENRUTADOR

// CREATE
// router.get('/productos/create', authMiddleware, product.add)
// router.post("/productos/create", fileUpload.single("image"), validationsProduct, product.create)

// // EDIT
// router.get('/productos/edit/:id', authMiddleware, product.edit)
// router.put("/productos/:id", fileUpload.single("image"), validationsProductEdit, product.update)

// // DELETE 
// router.get("/productos/delete/:id", authMiddleware, product.delete)
// router.delete("/productos/delete/:id", authMiddleware, product.destroy)

module.exports = router