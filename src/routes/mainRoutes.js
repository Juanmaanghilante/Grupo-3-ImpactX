const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mainControllerDb = require('../controllers/mainControllerDb');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const validations = [
    //body("nombre").notEmpty().withMessage("Tienes que escribir un nombre"),
    //body("apellido").notEmpty().withMessage("Tienes que escribir un apellido"),
    body("mensaje").notEmpty().withMessage("Tienes que escribir un mensaje")
]

//router.get('/', mainController.index);
//router.post('/contactenos/create', validations, mainController.createContactenos);
router.get('/', mainControllerDb.index);
router.post('/contactenos/create', validations, mainControllerDb.createContactenos);

//Gestionar requests
router.get('/request/edit', authMiddleware, mainController.request);
router.post('/request/:id', mainController.sendAnswer);

module.exports = router