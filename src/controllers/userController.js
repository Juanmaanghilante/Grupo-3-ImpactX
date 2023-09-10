const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../database/models");

const Profile = db.Profile;
const User = db.User;
const ContactMessage = db.ContactMessage;
const OldPassword = db.OldPassword;

module.exports = {
  userLogin: (req, res) => {
    return res.render("users/loginUser");
  },
  userLoginList: async (req, res) => {
    try {
      const userExistance = await User.findOne({ attributes: ['user_name'], where: { user_name: req.body.user } });
      if (userExistance === null) {
        return res.json("noExiste")
      } else {
        return res.json("Existe");
      }
      } catch (error) {
      console.log(error);
    }
  },
  loginProcess: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/loginUser", {
        errors: resultValidation.mapped(),
      });
    }
    try {
      const userToLogin = await User.findOne({
        where: {
          user_name: req.body.user,
        },
        include: [{ association: "perfiles" }],
      });
      // si, hay alguien tratando de loggearse
      if (userToLogin) {
        // comparame la clave encriptada y lo que puso el que se quiere loguear
        let passwordOk = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        // si true la comparación
        if (passwordOk) {
          // eliminamos el pasword, que nos viene por req.body, así no se ve
          delete userToLogin.password;
          // loggeamos a la persona
          req.session.userLogged = userToLogin;

          if (req.body.rememberUser) {
            res.cookie("userEmail", req.body.user, { maxAge: 1000 * 60 * 60 });
          }

          return res.redirect("/user/profile");
        } else {
          return res.render("users/loginUser", {
            errors: {
              user: {
                msg: "The credentials are invalid",
              },
            },
          });
        }
      }

      return res.render("users/loginUser", {
        errors: {
          user: {
            msg: "Username does not exist",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  userSignup: async (req, res) => {
    try {
      const perfiles = await Profile.findAll();
      return res.render("users/signupUser", { perfiles: perfiles });
    } catch (error) {
      console.log(error);
    }
  },
  userCreateProcess: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        const perfiles = await Profile.findAll();
        return res.render("users/signupUser", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          perfiles: perfiles,
        });
      }

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
              msg: "This user is already registered",
            },
          },
          oldData: req.body,
          perfiles: perfiles,
        });
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const userToCreate = await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        user_name: req.body.user,
        email: req.body.email,
        profile_id: req.body.categoria ? req.body.categoria : "2",
        password: bcrypt.hashSync(req.body.password, 10),
        confirm_password: bcrypt.hashSync(req.body.repeatPassword, 10),
        image: req.file ? req.file.filename : "product-default.png",
      });
      return res.redirect("/user/login") ;
    } catch (error) {
      console.log(error);
    }
  },
  userProfile: (req, res) => {
    return res.render("users/profileUser", { user: req.session.userLogged });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  userEdit: async (req, res) => {
    try {
      let usuarioE = await db.User.findByPk(req.params.id);
      let perfilesE = await Profile.findAll();
      const [usuario, perfiles] = await Promise.all([usuarioE, perfilesE]);
      if (usuario) {
        return res.render("users/editUser", {
          usuario: usuario,
          perfiles: perfiles,
        });
      } else {
        return res.render("The user to edit does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  },

  userEditProcess: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        let perfilesE = await Profile.findAll();
        console.log(resultValidation.mapped());
        return res.render("users/editUser", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          id: req.params.id,
          perfiles: perfilesE,
        });
      }

      const t = await sequelize.transaction();
      const usuarioEditar = await User.update(
        {
          name: req.body.name,
          lastname: req.body.lastname,
          user_name: req.body.user,
          email: req.body.email,
          profile_id: req.body.categoria ? req.body.categoria : "2",
          image: req.file ? req.file.filename : "product-default.png",
        },
        { where: { id: req.params.id } },
        { transaction: t }
      );
      await t.commit();
      if (req.params.id == req.session.userLogged.id) {
        if (req.cookies.userEmail) {
          res.clearCookie("userEmail");
          res.cookie("userEmail", req.body.user, { maxAge: 1000 * 60 * 60 });
        }
        delete usuarioEditar.password;
        req.session.userLogged = usuarioEditar;
      }
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
    return res.redirect("/user/profile");
  },
  userList: async (req, res) => {
    try {
      const usersHabilitados = await db.User.findAll({
        include: [{ association: "perfiles" }],
      });
      return res.render("users/listUser", { usuarios: usersHabilitados });
    } catch (error) {
      console.log(error);
    }
  },
  userDestroyProcess: async (req, res) => {
    try {
      let userId = req.params.id;
      const contactMessageDelete = await ContactMessage.destroy({
        where: { user_id: userId },
      });
      const userDelete = await User.destroy({ where: { id: userId } });

      let [contactMessageDeleteProcess, userDeleteProcess] = await Promise.all([
        contactMessageDelete,
        userDelete,
      ]);

      if (req.params.id == req.session.userLogged.id) {
        if (req.cookies.userEmail) {
          res.clearCookie("userEmail");
        }
        req.session.destroy();
        res.redirect("/");
      }
      return res.redirect("/user/list");
    } catch (error) {
      console.log(error);
    }
  },
  passwordChange: (req, res) => {
    const usuarioCambiarPass = req.session.userLogged;

    return res.render("users/changePassUser", { usuario: usuarioCambiarPass });
  },
  passwordChangeProcess: async (req, res) => {
    try {
      const usuarioEditar = await User.update(
        {
          password: bcrypt.hashSync(req.body.contraseniaNueva, 10),
          confirm_password: bcrypt.hashSync(req.body.contraseniaNueva, 10),
        },
        { where: { id: req.session.userLogged.id } }
      );
      const oldPassword = await OldPassword.create({
        user_id: req.session.userLogged.id,
        old_password: bcrypt.hashSync(req.body.contrasenia, 10),
      });
      return res.redirect("/user/profile");
    } catch (error) {
      console.log(error);
    }
  },
};
