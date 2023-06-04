const path=require("path")


module.exports= {

  index:(req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
  },

  signup:  (req, res) => {
    res.sendFile(path.resolve('./views/signup.html'));
  },

  login: (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
  },  

  listado: (req, res) => {
    res.sendFile(path.resolve('./views/listado.html'));
  },

  cart: (req, res) => {
    res.sendFile(path.resolve('./views/cart.html'));
  },

  product: (req, res) => {
    res.sendFile(path.resolve('./views/product.html'));
  },
  
  formProduct: (req, res) => {
    res.sendFile(path.resolve('./views/formProduct.html'));
  },

}