const path = require("path")
const fs = require('fs');
const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/user.json')) )
module.exports = {


  userLogin: (req, res) => {
    return res.render('users/login')
  },

  userSignup: (req, res) => {
    return res.render('users/signup')
  },

  userEdit: (req, res) => {
    return res.render('users/edicionUsuario')
  },

  userEditProcess: (req, res) => {
    
  },




  userCreate: (req, res) => {
    let usuarioCrear = {
      usuario:req.body.usuario,
      nombre:req.body.nombre,
      apellido: req.body.apellido,
      email:req.body.correo,
      // categoria:req.body.
      contraseña:req.body.contrasenia,
      repetircontraseña:req.body.contaseniarepetir,
    }
    
    fs.writeFileSync(path.resolve(__dirname,'../database/user.json'),JSON.stringify([...datos,usuarioCrear],null,2))
    console.log(req.body);
    res.redirect("/")

    res.redirect("/")
    
  },





  userCreateProcess: (req, res) => {
    
   
  },






  userDeleteProcess: (req, res) => {
    
  },
}