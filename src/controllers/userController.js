const path = require("path")

module.exports = {

  index: (req, res) => {
    return res.render('index')
  },





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