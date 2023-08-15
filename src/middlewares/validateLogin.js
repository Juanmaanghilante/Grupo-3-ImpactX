const { body } = require("express-validator");

module.exports = [
  body("user").notEmpty().withMessage("You must complete the username"),
  body("password")
    .notEmpty()
    .withMessage("You must complete the password"),
];
