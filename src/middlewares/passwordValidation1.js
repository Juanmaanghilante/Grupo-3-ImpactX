const db = require("../database/models");
const User = db.User;
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = [
  body("contrasenia")
    .notEmpty()
    .withMessage("You must enter your password")
    .bail()
    .custom(async (value, { req }) => {
      const usuarioAEvaluarConPass = await User.findOne({
        where: {
          user_name: req.session.userLogged.user_name,
        },
      });
      const passDescifrada = bcrypt.compareSync(
        req.body.contrasenia,
        usuarioAEvaluarConPass.password
      );

      if (!passDescifrada) {
        throw new Error("The password entered is not correct");
      }

      return true;
    }),

  body("contraseniaNueva")
    .notEmpty()
    .withMessage("You must enter your new password")
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

  body("contraseniaNuevaRepetir")
    .notEmpty()
    .withMessage("You must repeat your new password")
    .bail()
    .custom((value, { req }) => {
      if (req.body.contraseniaNueva != req.body.contraseniaNuevaRepetir) {
        throw new Error("New passwords don't match");
      }

      return true;
    })
    .bail()
    .custom((value, { req }) => {
      if (req.body.contraseniaNueva == req.body.contrasenia) {
        throw new Error(
          "You must enter a different password than the current one"
        );
      }

      return true;
    })
    .bail()
    .custom(async (value, { req }) => {
      const passAModificar = await User.findOne({
        where: {
          user_name: req.session.userLogged.user_name,
        },
        include: [{ association: "oldpassword" }],
      });

      const contraseniaNueva = req.body.contraseniaNueva;

      if (passAModificar.oldpassword && passAModificar.oldpassword.length > 0) {
        const contraseniaEncontrada = await Promise.all(
          passAModificar.oldpassword.map(async (oldPassword) => {
            const contraseniaCoincide = await bcrypt.compare(
              contraseniaNueva,
              oldPassword.old_password
            );

            return contraseniaCoincide;
          })
        );

        if (contraseniaEncontrada.some((match) => match === true)) {
          console.log(
            "La contraseña ingresada ya existe en el historial de contraseñas."
          );
          throw new Error("The entered password has already been used");
        } else {
          console.log(
            "La contraseña ingresada es nueva y no existe en el historial de contraseñas."
          );
        }
      } else {
        console.log("No se encontraron contraseñas antiguas en el historial.");
      }

      return true;
    }),
];
