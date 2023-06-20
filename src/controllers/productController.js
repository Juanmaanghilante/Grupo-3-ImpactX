const fs = require('fs');
const path = require("path")

const rutaBase = path.resolve('./src/database/products.json')
const productos = JSON.parse(fs.readFileSync(rutaBase));

module.exports = {


  productsCart: (req, res) => {
    return res.render('products/cart')
  },

  productsDetail: (req, res) => {
    return res.render('products/detalleProductos', { productos: productos });
  },

  productsCreate: (req, res) => {
    return res.render('products/formCreate')
  },

  productsCreateProcess: (req, res) => {

  },

  productsEdit: (req, res) => {
    return res.render('products/formEdit')
  },

  productsEditProcess: (req, res) => {

  },

  productsDeleteProcess: (req, res) => {

  },


}