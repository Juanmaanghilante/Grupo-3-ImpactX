const { body, check } = require("express-validator");
const path = require("path");

module.exports = [
  body("user").notEmpty().withMessage("You must complete the username"),
  body("name")
    .notEmpty()
    .withMessage("You must complete the name")
    .isLength({min: 2}),
  body("lastname")
    .notEmpty()
    .withMessage("You must complete the lastname")
    .bail()
    .isLength({min: 2}),
  body("email")
    .notEmpty()
    .withMessage("You must complete the email")
    .bail()
    .isEmail()
    .withMessage("You must write a valid email"),

  check("category")
    .if(
      (value, { req }) =>
        req.session.userLogged.perfiles.id == "1" && !req.body.categoria
    )
    .notEmpty()
    .withMessage("As Admin, you must select a category"),

  body("password")
    .notEmpty()
    .withMessage("You must complete the password")
    .bail()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage(
      "The password must have at least: 8 characters, an upper case letter"
    ),

    body('repeatPassword')
		.notEmpty().withMessage('You must repeat your new password').bail()
		.custom((value, { req }) => {

			if(req.body.password != req.body.repeatPassword) {
				throw new Error('New passwords do not match');
			}

			return true;

		}).bail(),    

  body("profilePic").custom((value, { req }) => {
    let file = req.file;
    let extensionesPermitidas = [".jpg", ".jpeg" ,".png", ".gif"];

    if (!file) {
      throw new Error("You must select an image");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!extensionesPermitidas.includes(fileExtension)) {
        throw new Error(
          `Allowed extensions: ${extensionesPermitidas.join(", ")}`
        );
      }
    }
    return true;
  }),
];
