const express = require('express');
const router = express.Router();
const mainControler = require('../controllers/mainControllers');


router.get('/', mainControler.index)
router.get('/login', mainControler.login)
router.get('/signup', mainControler.signup)
router.get('/createProduct', mainControler.createProduct)
router.get('/products', mainControler.products)
router.get('/cart', mainControler.cart)


module.exports = router