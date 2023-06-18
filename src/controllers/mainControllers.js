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




  cart: (req, res) => {
    return res.render('products/cart')
  },

  products: (req, res) => {
    return res.render('products/detalleProductos')
  },

  edit: (req, res) => {
    return res.render('products/formEdit')
  },

  create: (req, res) => {
    return res.render('products/formCreate')
  }



}