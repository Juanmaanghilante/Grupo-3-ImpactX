const express = require('express');
const router = express.Router();
const mainControler =require ('../controllers/mainControllers');


router.get('/',mainControler.index)
router.get('/signup',mainControler.signup)
router.get('/login',mainControler.login)
router.get('/listado',mainControler.listado)
router.get('/cart',mainControler.cart)
router.get('/product',mainControler.product)
router.get('/formProduct',mainControler.formProduct)


module.exports= router