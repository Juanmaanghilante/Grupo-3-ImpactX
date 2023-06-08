const path=require("path")


module.exports= {

  index:(req, res) => {
    return res.render('index')
  },

  signup:  (req, res) => {
    return res.render('signup')
  },

  login: (req, res) => {
    return res.render('login')
  },  

  listado: (req, res) => {
    return res.render('listado')
  },

  cart: (req, res) => {
    return res.render('cart')
  },

  product: (req, res) => {
    return res.render('product')
  },
  
  formProduct: (req, res) => {
    
    return res.render('formProduct')
  },

}