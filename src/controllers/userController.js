const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const db= require('../database/models')
const { validationResult } = require("express-validator");
const rutaBase = path.resolve("./src/database/user.json");
const datos = JSON.parse(fs.readFileSync(rutaBase));
const userPass = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../database/passwords.json"))
);

const User = require("../models/User");

module.exports = {
  userLogin: (req, res) => {
    return res.render("users/loginUser");
  },

  loginProcess: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/loginUser", {
        errors: resultValidation.mapped()
      });
    }
    let userToLogin = User.findByField("user", req.body.user);
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
              msg: "Las credenciales son inválidas",
            },
          },
        });
      }
    }

    return res.render("users/loginUser", {
      errors: {
        user: {
          msg: "No se encuentra este usuario en la base de datos",
        },
      },
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  userProfile: (req, res) => {
    return res.render("users/profileUser", { user: req.session.userLogged });
  },

  userSignup: (req, res) => {
    return res.render("users/signupUser");
  },
  
  userList: async(req, res) => {
    const usersHabilitados =await  db.User.findAll();

    return res.render("users/listUser", { usuarios: usersHabilitados });
  },

  userEdit: (req, res) => {
    const usuarioEditar = datos.find((usuario) => usuario.id == req.params.id);
    if (usuarioEditar) {
      return res.render("users/editUser", { usuario: usuarioEditar });
    } else {
      return res.render("error404");
    }
  },

  userEditProcess: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/editUser", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        id: req.params.id,
      });
    }
    const usuarioEditar = datos.find(
      (usuario) => usuario.id == req.params.id && usuario.isDelete == false
    );
    usuarioEditar.user = req.body.user;
    usuarioEditar.name = req.body.name;
    usuarioEditar.lastname = req.body.lastname;
    if (req.body.categoria) {
      usuarioEditar.category = req.body.categoria;
    }
    usuarioEditar.email = req.body.email;
    if (req.file) {
      fs.unlinkSync(
        path.resolve(__dirname, "../../public/img/" + usuarioEditar.imagen)
      );
      usuarioEditar.imagen = req.file.filename;
    }
    fs.writeFileSync(
      path.resolve(__dirname, "../database/user.json"),
      JSON.stringify(datos, null, 2)
    );

    if (req.params.id == req.session.userLogged.id) {
      console.log(usuarioEditar);
      res.clearCookie("userEmail");
      delete usuarioEditar.password;
      res.cookie("userEmail", req.body.user, { maxAge: 1000 * 60 * 60 });
      req.session.userLogged = usuarioEditar;
    }

    return res.redirect("profile");
  },

  userCreateProcess: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/signupUser", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDb = User.findByField("user", req.body.user);
    if (userInDb) {
      return res.render("users/signupUser", {
        errors: {
          user: {
            msg: "Este usuario ya se encuentra está registrado",
          },
          email: { msg: "este email esta en uso" },
        },
        oldData: req.body,
      });
    }
    let userToCreate = {
      id: datos.length + 1,
      user: req.body.user,
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      category: req.body.categoria ? req.body.categoria : "Cliente",
      imagen: req.file.filename,
      isDelete: false,
    };
    //User.create(userToCreate);

    datos.push(userToCreate);

    fs.writeFileSync(
      path.resolve(rutaBase),
      JSON.stringify(datos, null, 2),
      "utf-8"
    );

    res.redirect("/user/login");
  },

  userDeleteProcess: (req, res) => {
    const usuarioBorrar = datos.find((usuario) => usuario.id == req.params.id);
    usuarioBorrar.isDelete = true;

    fs.writeFileSync(
      path.resolve(rutaBase),
      JSON.stringify(datos, null, 2),
      "utf-8"
    );
    return res.redirect("/user/list");
  },

  passwordChange: (req, res) => {
    const usuarioCambiarPass = req.session.userLogged;
    return res.render("users/changePassUser", { usuario: usuarioCambiarPass });
  },

  passwordChangeProcess: (req, res) => {
    const datosUsuarioSinPass = datos.find(
      (row) => row.user == req.session.userLogged.user
    );

    const usuarioPassVieja = {
      user: datosUsuarioSinPass.user,
      password: datosUsuarioSinPass.password,
    };

    fs.writeFileSync(
      path.resolve(__dirname, "../database/passwords.json"),
      JSON.stringify([...userPass, usuarioPassVieja], null, 2),
      "utf-8"
    );

    datosUsuarioSinPass.password = bcrypt.hashSync(
      req.body.contraseniaNueva,
      10
    );

    fs.writeFileSync(
      path.resolve(__dirname, "../database/user.json"),
      JSON.stringify(datos, null, 2),
      "utf-8"
    );
    res.redirect("/");
  },
};
