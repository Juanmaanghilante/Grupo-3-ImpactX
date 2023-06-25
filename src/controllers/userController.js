const path = require("path")
const fs = require('fs');
const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/user.json')))
module.exports = {


  userLogin: (req, res) => {
    return res.render('users/login')
  },

  userSignup: (req, res) => {
    return res.render('users/signup')
  },

  userEdit: (req, res) => {
    const usuarioEditar = datos.find(usuario => usuario.id == req.params.id)
    console.log(req.params.id);
    console.log(datos[0]);
    console.log(usuarioEditar);
    return res.render('users/edicionUsuario', { usuario: usuarioEditar })
  },

  userEditProcess: (req, res) => {
    const usuarioEditar = datos.find(usuario => usuario.id == req.params.id)
    console.log(req.body);
    usuarioEditar.user = req.body.user
    usuarioEditar.name = req.body.name
    usuarioEditar.lastName = req.body.lastName
    usuarioEditar.email = req.body.email
    usuarioEditar.imagen = req.body.imagen
    fs.writeFileSync(path.resolve(__dirname,'../database/user.json'),JSON.stringify(datos, null, 2));
    return res.redirect('edit/' + usuarioEditar.id)
  },


  userCreate: (req, res) => {
    let usuarioCrear = {
      id: Date.now(),
      user: req.body.user,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      category:req.body.category,
      password: req.body.password,
   
      isDelete: false
    }

    fs.writeFileSync(path.resolve(__dirname, '../database/user.json'), JSON.stringify([...datos, usuarioCrear], null, 2))
    console.log(req.body);

    res.redirect("/")
  },

  userDeleteProcess: (req, res) => {
    const usuarioBorrar = datos.find(usuario => usuario.id == req.params.id)
    usuarioBorrar.isDelete = true
    fs.writeFileSync(path.resolve(__dirname, '../database/user.json'), JSON.stringify(datos, null, 2))
    res.redirect('/')
  },
}