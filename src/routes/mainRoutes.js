const express = require('express');
const router = express.Router();
const productControler = require('../controllers/mainController');
const { body } = require('express-validator');

const validations = [
    body("nombre").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("apellido").notEmpty().withMessage("Tienes que escribir un apellido"),
    body("correo")
        .notEmpty().withMessage("Tienes que escribir un correo").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body("mensaje").notEmpty().withMessage("Tienes que escribir un mensaje")
]

router.get('/', productControler.index);
router.post('/contactenos/create', validations, productControler.createContactenos);

//Gestionar requests
router.get('/request/edit', productControler.request);

module.exports = router