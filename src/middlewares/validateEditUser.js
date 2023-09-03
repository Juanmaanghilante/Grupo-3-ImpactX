const { body } = require("express-validator");
const path = require("path");
const db = require("../database/models");

module.exports = [
  body("user")
  .notEmpty().withMessage("You must complete the username").bail()
  .custom( async (value, { req }) => {

    const usuarioEncontrado = await db.User.findOne({
      where: {
        user_name: req.session.userLogged.user_name,
      },
      include: [{ association: "oldpassword" }],
    })
  
    if (usuarioEncontrado) {
      throw new Error("The entered user name has already been used");
    }

    return true;
  }),

  body("name").notEmpty().withMessage("You must complete the name"),
  body("lastname").notEmpty().withMessage("You must complete the lastname"),

  body("email")
    .notEmpty()
    .withMessage("You must complete the email")
    .bail()
    .isEmail()
    .withMessage("You must write a valid email")
    .bail()
    .custom(async (value, { req }) => {

      const emailEncontrado = await db.User.findOne({
        where: {
          email: req.session.userLogged.email,
        },
        include: [{ association: "oldpassword" }],
      })
     
      if (emailEncontrado) {
        throw new Error("The entered email has already been used");
      }
  
      return true;
    }),

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
