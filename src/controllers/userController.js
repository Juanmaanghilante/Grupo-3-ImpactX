const { validationResult } =require('express-validator')
const path = require("path")
const fs = require('fs');
const bcrypt = require("bcryptjs")
const rutaBase = path.resolve('./src/database/user.json')
const datos = JSON.parse(fs.readFileSync(rutaBase));


module.exports = {

  userLogin: (req, res) => {
    return res.render('users/login')
  },

  userSignup: (req, res) => {
    return res.render('users/signup')
  },
  userList: (req, res) => {
    const usersHabilitados = datos.filter(row => row.isDelete == false)
    return res.render('users/usuariosListado', { usuarios: usersHabilitados })
  },

  userEdit: (req, res) => {
    const usuarioEditar = datos.find(usuario => usuario.id == req.params.id)
    console.log(req.params.id);
    console.log(datos[0]);
    console.log(usuarioEditar);
    return res.render('users/edicionUsuario', { usuario: usuarioEditar })
  },

  userEditProcess: (req, res) => {
    const usuarioEditar = datos.find(usuario => usuario.id == req.params.id && usuario.isDelete == false);
    console.log(req.body);
    usuarioEditar.user = req.body.user
    usuarioEditar.name = req.body.name
    usuarioEditar.lastName = req.body.lastName
    usuarioEditar.email = req.body.email
    if (req.file) {
      fs.unlinkSync(path.resolve(__dirname, "../../public/img/" + usuarioEditar.imagen))
      usuarioEditar.imagen = req.file.filename
    }
    fs.writeFileSync(path.resolve(__dirname, '../database/user.json'), JSON.stringify(datos, null, 2));
    return res.redirect('edit/' + usuarioEditar.id)
  },

  userCreateProcess: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      // mapped() convierte el objeto literal en un array
      return res.render('users/signup', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }

    let usuarioCrear = {
      id: datos.length + 1,
      user: req.body.user,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      categoria: req.body.category,
      imagen: req.file.filename,
      password: bcrypt.hashSync(req.body.password),
      isDelete: false
    }

    datos.push(usuarioCrear)

    fs.writeFileSync(path.resolve(rutaBase), JSON.stringify(datos, null, 2), 'utf-8');

    res.redirect("/user/list")
  },

  userDeleteProcess: (req, res) => {
    const usuarioBorrar = datos.find(usuario => usuario.id == req.params.id)
    usuarioBorrar.isDelete = true

    fs.writeFileSync(path.resolve(rutaBase), JSON.stringify(datos, null, 2), 'utf-8');
    return res.redirect('/user/list')
  },
}