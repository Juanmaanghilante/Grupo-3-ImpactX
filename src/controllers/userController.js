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
    const usuarioEditar= datos.find(usuario=> usuario.id == req.params.id ) 
console.log(req.params.id);
console.log(datos[0]);
console.log(usuarioEditar);
    return res.render('users/edicionUsuario',{usuario:usuarioEditar})
  },

  userEditProcess: (req, res) => {
    
  },




  userCreate: (req, res) => {
    let usuarioCrear = {

      id:Date.now(),
      usuario:req.body.usuario,
      nombre:req.body.nombre,
      apellido: req.body.apellido,
      email:req.body.correo,
      // categoria:req.body.
      contraseña:req.body.contrasenia,
      repetircontraseña:req.body.contaseniarepetir,
      isDelete:false
    }
    
    fs.writeFileSync(path.resolve(__dirname,'../database/user.json'),JSON.stringify([...datos,usuarioCrear],null,2))
    console.log(req.body);
    

    res.redirect("/")
    
  },












  userDeleteProcess: (req, res) => {
    const usuarioBorrar= datos.find(usuario=>usuario.id == req.params.id) 
    usuarioBorrar.isDelete = true
    fs.writeFileSync(path.resolve(__dirname,'../database/user.json'),JSON.stringify(datos,null,2))
    res.redirect('/')
  },
}