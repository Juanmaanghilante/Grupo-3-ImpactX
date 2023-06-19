const express = require('express');
const router = express.Router();
const productControler = require('../controllers/productController');




router.get('/productos', productControler.products)
router.get('/cart', productControler.cart)

// EDIT
// router.get('/edit', productControler.edit)

// CREATE
router.get('/productos/create', productControler.create)


module.exports = router