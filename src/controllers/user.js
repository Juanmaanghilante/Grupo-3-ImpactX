const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { sequelize } = require('../database/models')
const Profile = db.Profile;
const User = db.User;
const fs=require('fs')
const path=require('path')
module.exports = {
  userLogin: (req, res) => {
    return res.render("users/loginUser");
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
    } catch (error) {
      console.log(error);
    }
  },
  userSignup: async (req, res) => {
    const perfiles = await Profile.findAll();
    return res.render("users/signupUser", { perfiles: perfiles });
  },
  userCreateProcess: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      const perfiles = await Profile.findAll();
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
        image: req.file.filename,
      });
      return res.redirect("/user/login");
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
    let usuarioE = await db.User.findByPk(req.params.id)
    if (usuarioE) {
      return res.render("users/editUser", { usuario: usuarioE });
    } else {
      return res.render("error404");
    }


  },

  userEditProcess: async (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/editUser", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        id: req.params.id,
      });
    }
   
    const t = await sequelize.transaction()
    try {
     
       if (req.file)
        {
          const usuarioEditar = await db.User.update({
            name: req.body.name,
            lastname: req.body.lastname,
            user_name: req.body.user,
            email: req.body.email,
            //  profile_id: req.body.categoria ? req.body.categoria : "2",
    
          image: req.file.filename
    
          
          },
            { where: { id: req.params.id } }, { transaction: t }
          );
          await t.commit()
         
         
           fs.unlinkSync(path.resolve(__dirname, '../../public/img/' + req.body.oldImage))
       
        }
    else{
      const usuarioEditar = await db.User.update({
        name: req.body.name,
        lastname: req.body.lastname,
        user_name: req.body.user,
        email: req.body.email,
        //  profile_id: req.body.categoria ? req.body.categoria : "2",

      
      
      },
        { where: { id: req.params.id } }, { transaction: t }
      );
      await t.commit()
    } 
    } catch (error) {
      console.log(error);
      if (req.file) {
         fs.unlinkSync(path.resolve(__dirname, '../../public/img/' + req.file.filename));

      } await t.rollback()

    }
return res.redirect('/user/list')

   
  },
  userList: async(req, res) => {
    const usersHabilitados =await  db.User.findAll();

    return res.render("users/listUser", { usuarios: usersHabilitados });
  },

}  