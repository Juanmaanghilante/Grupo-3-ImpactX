const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("user").notEmpty().withMessage("You must complete the username"),
  body("name").notEmpty().withMessage("You must complete the name"),
  body("lastname").notEmpty().withMessage("You must complete the lastname"),

  body("email")
    .notEmpty()
    .withMessage("You must complete the email")
    .bail()
    .isEmail()
    .withMessage("You must write a valid email"),

  body("category").custom((value, { req }) => {
    let rol = req.session.userLogged.perfiles.id;
    let categoria = req.body.categoria;

    if (rol == "1" && !categoria) {
      throw new Error("As Admin, you must select a category");
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
          `Allowed extensions: ${extensionesPermitidas.join(", ")}`
        );
      }
    } 
    // else {
    //   throw new Error("You must select an image");
    // }
    return true;
  }),
];
