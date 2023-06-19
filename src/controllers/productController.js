const path = require("path")


module.exports = {


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