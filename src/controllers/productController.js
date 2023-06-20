const path = require("path")


module.exports = {


  productsCart: (req, res) => {
    return res.render('products/cart')
  },

  productsDetail: (req, res) => {
    return res.render('products/alexProd')
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