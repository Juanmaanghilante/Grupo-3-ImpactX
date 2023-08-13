const { body, check } = require("express-validator");
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

  check("category")
    .if(
      (value, { req }) =>
        req.session.userLogged.category === "Admin" && !req.body.categoria
    )
    .notEmpty()
    .withMessage("Como Admin, debe seleccionar una categoría"),

  body("password")
    .notEmpty()
    .withMessage("Debe completar el campo con su contraseña")
    .bail()
    .isStrongPassword({
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener como minimo: 6 caracteres, una minuscula, una mayuscula y un simbolo "
    ),

    body('repeatPassword')
		.notEmpty().withMessage('Debe repetir su contraseña nueva').bail()
		.custom((value, { req }) => {

			if(req.body.password != req.body.repeatPassword) {
				throw new Error('Las contraseñas nuevas no coinciden');
			}

			return true;

		}).bail(),    

  body("profilePic").custom((value, { req }) => {
    let file = req.file;
    let extensionesPermitidas = [".jpg", ".png", ".gif"];

    if (!file) {
      throw new Error("Debe seleccionar una imagen de perfil");
    } else {
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
