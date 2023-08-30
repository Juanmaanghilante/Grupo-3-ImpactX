const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mainControllerDb = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const validations = [
    /*body("nombre").notEmpty().withMessage("Tienes que escribir un nombre"),
    body("apellido").notEmpty().withMessage("Tienes que escribir un apellido"),
    body("email").notEmpty().withMessage("You must write a email"),*/
    body("mensaje").notEmpty().withMessage("You must write a message")
]

const validationsSendRequest = [
    body("nombre").notEmpty().withMessage("You must write a name"),
    body("apellido").notEmpty().withMessage("You must write a lastname"),
    body("email").notEmpty().withMessage("You must write a email"),
    body("mensaje").notEmpty().withMessage("You must write a message"),
    body("answer").notEmpty().withMessage("You must write an answer")
]


router.get('/', mainControllerDb.index);
router.post('/contactenos/create', authMiddleware, validations, mainControllerDb.createContactenos);

//Gestionar requests
router.get('/request/edit', authMiddleware, mainControllerDb.request);
router.post('/request/:id', validationsSendRequest, mainControllerDb.sendAnswer);

module.exports = router