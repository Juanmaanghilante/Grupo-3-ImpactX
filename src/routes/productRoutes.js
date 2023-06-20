const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productController');



// PRODUCTS / CART
router.get('/productos', productControler.productsDetail)
router.get('/cart', productControler.productsCart)

// CREATE
router.get('/productos/create', productControler.productsCreate)
router.post("/productos", productControler.productsCreateProcess)

// EDIT
router.get('/productos/edit/:id', productControler.productsEdit)
router.put("/productos/:id", productControler.productsEditProcess)

// DELETE
router.delete("/productos/delete/:id", productControler.productsDeleteProcess)

module.exports = router