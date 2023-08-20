const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("category")
    .notEmpty()
    .withMessage("You must select a category product/service"),
  body("product")
    .notEmpty()
    .withMessage("You must complete the name product/service"),
  body("desc")
    .notEmpty()
    .withMessage("You must complete the description product/service"),
  body("price")
    .notEmpty()
    .withMessage("You must complete the price product/service"),
];
