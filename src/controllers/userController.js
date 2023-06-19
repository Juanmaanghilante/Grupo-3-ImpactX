const path = require("path")


module.exports = {


  login: (req, res) => {
    return res.render('users/login')
  },

  signup: (req, res) => {
    return res.render('users/signup')
  },

  edit: (req, res) => {
    return res.render('users/edicionUsuario')
  },




}