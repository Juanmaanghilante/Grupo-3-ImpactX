const path = require("path");
const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sequelize = db.sequelize;

const Profile = db.Profile;
const User = db.User;

module.exports = {
  userSignup: async (req, res) => {
    const perfiles = await Profile.findAll();
    return res.render("users/signupUser", { perfiles: perfiles });
  },
  userCreateProcess: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      const perfiles = await Profile.findAll();
      console.log(perfiles);
      console.log(req.body);
      return res.render("users/signupUser", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        perfiles: perfiles,
      });
    }

    try {
      const userInDb = await User.findOne({
        where: {
          user_name: req.body.user,
        },
      });

      if (userInDb) {
        const perfiles = await Profile.findAll();
        return res.render("users/signupUser", {
          errors: {
            user: {
              msg: "Este usuario ya se encuentra está registrado",
            }
          },
          oldData: req.body,
          perfiles: perfiles
        });
      }
    } catch (error) {
      console.log(error);
    }

    try {
        const userToCreate = await User.create({
            name: req.body.name,
            lastname: req.body.lastName,
            user_name: req.body.user,
            email: req.body.email,
            profile_id: req.body.categoria ? req.body.categoria : "2",
            password: bcrypt.hashSync(req.body.password, 10),
            confirm_password: bcrypt.hashSync(req.body.repeatPassword, 10)
            //imagen: req.file.filename,
        });
        console.log(userToCreate);
        return res.redirect("/user/login");
      } catch (error) {
        console.log(error);
      }
  },
};
