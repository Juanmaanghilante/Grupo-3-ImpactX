const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("user").notEmpty().withMessage("Debe completar el nombre de usuario"),
  body("name").notEmpty().withMessage("Debe completar el campo con su nombre"),
  body("lastName")
    .notEmpty()
    .withMessage("Debe completar el campo con su apellido"),

  body("email")
    .notEmpty()
    .withMessage("Debe completar el campo con su email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),

  body("profilePic").custom((value, { req }) => {
    let file = req.file;
    let extensionesPermitidas = [".jpg", ".png", ".gif"];

    if (file) {
      let fileExtension = path.extname(file.originalname);
      if (!extensionesPermitidas.includes(fileExtension)) {
        throw new Error(
          `Extensiones permitidas: ${extensionesPermitidas.join(", ")}`
        );
      }
    }
    return true;
  }),
];
