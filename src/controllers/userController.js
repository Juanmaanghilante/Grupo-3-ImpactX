const path = require("path")

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
    
  },

  userCreateProcess: (req, res) => {
    
  },

  userDeleteProcess: (req, res) => {
    
  },
}