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

  body("image").custom((value, { req }) => {
    let file = req.file;
    let extensionesPermitidas = [".jpg", ".png", ".gif"];

    if (file) {
      let fileExtension = path.extname(file.originalname);
      if (!extensionesPermitidas.includes(fileExtension)) {
        throw new Error(
          `Allowed extensions: ${extensionesPermitidas.join(", ")}`
        );
      }
    }
    //  else {
    //   throw new Error("You must select an image");
    // }
    return true;
  }),
];
