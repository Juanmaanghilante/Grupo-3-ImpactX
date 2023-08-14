const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("user").notEmpty().withMessage("Debe completar el nombre de usuario"),
  body("name").notEmpty().withMessage("Debe completar el campo con su nombre"),
  body("lastname")
    .notEmpty()
    .withMessage("Debe completar el campo con su apellido"),

  body("email")
    .notEmpty()
    .withMessage("Debe completar el campo con su email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),

  body("category").custom((value, { req }) => {
    let rol = req.session.userLogged.perfiles.id;
    let categoria = req.body.categoria;

    if (rol == "1" && !categoria) {
      throw new Error("Como Admin, debe seleccionar una categoria");
    }
    return true;
  }),

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
