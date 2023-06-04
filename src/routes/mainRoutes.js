
const express = require('express');
const router = express.Router();

const mainControler =require ('../controllers/mainControllers');


router.get('/',mainControler.home)

router.get('/signup',mainControler.registro)


router.get('/login',mainControler.login)

router.get('/listado',mainControler.listado)



router.get('/carrito',mainControler.carrito)


router.get('/detalle',mainControler.detalleProducto)

router.get('/formProducto',mainControler.formProducto)

module.exports= router