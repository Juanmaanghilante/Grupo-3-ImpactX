const path = require("path")


module.exports = {

  index: (req, res) => {
    return res.render('index')
  },

  login: (req, res) => {
    return res.render('login')
  },

  signup: (req, res) => {
    return res.render('signup')
  },

  createProduct: (req, res) => {
    return res.render('createProduct')
  },

  products: (req, res) => {
    return res.render('products')
  },

  cart: (req, res) => {
    return res.render('cart')
  },



}