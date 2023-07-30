const { body, check } = require("express-validator");
const path = require("path");

module.exports = [
  body("user").notEmpty().withMessage("Ingrese el usuario"),
  body("password").notEmpty().withMessage("Debe completar el campo con su contraseña")
];
