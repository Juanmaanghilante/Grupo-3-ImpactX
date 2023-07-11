const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");
const rutaBase = path.resolve("./src/database/user.json");
const datos = JSON.parse(fs.readFileSync(rutaBase));

const User = require("../models/User");

module.exports = {
  userLogin: (req, res) => {
    return res.render("users/login");
  },

  loginProcess: (req, res) => {
    let userToLogin = User.findByField("user", req.body.user);
    console.log(userToLogin);
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
        console.log(userToLogin);
        req.session.userLogged = userToLogin;

        if (req.body.rememberUser) {
          res.cookie("userEmail", req.body.user, { maxAge: 1000 * 50 * 2 });
        }

        return res.redirect("/user/profile");
      } else {
        return res.render("users/login", {
          errors: {
            user: {
              msg: "Las credenciales son inválidas",
            },
          },
        });
      }
    }

    return res.render("users/login", {
      errors: {
        user: {
          msg: "No se encuentra este usuario en la base de datos",
        },
      },
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },

  userProfile: (req, res) => {
    //console.log(req.session.userLogged);
    return res.render("users/profile", { user: req.session.userLogged });
  },

  userSignup: (req, res) => {
    res.cookie("testing", "hola mundo", { maxAge: 1000 * 30 });
    return res.render("users/signup");
  },
  userList: (req, res) => {
    const usersHabilitados = datos.filter((row) => row.isDelete == false);
    return res.render("users/usuariosListado", { usuarios: usersHabilitados });
  },

  userEdit: (req, res) => {
    const usuarioEditar = datos.find((usuario) => usuario.id == req.params.id);
    return res.render("users/edicionUsuario", { usuario: usuarioEditar });
  },

  userEditProcess: (req, res) => {
    const usuarioEditar = datos.find(
      (usuario) => usuario.id == req.params.id && usuario.isDelete == false
    );
    usuarioEditar.user = req.body.user;
    usuarioEditar.name = req.body.name;
    usuarioEditar.lastName = req.body.lastName;
    usuarioEditar.categoria = req.body.categoria;
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
    return res.redirect("edit/" + usuarioEditar.id);
  },

  userCreateProcess: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      // mapped() convierte el objeto literal en un array
      return res.render("users/signup", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    //return res.send("haz introducido bien todos los campos requeridos")

    let userInDb = User.findByField("user", req.body.user);
    if (userInDb) {
      return res.render("users/signup", {
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
      ...req.body,
      category: "Cliente",
      imagen: req.file.filename,
      password: bcrypt.hashSync(req.body.password, 10),
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
};
