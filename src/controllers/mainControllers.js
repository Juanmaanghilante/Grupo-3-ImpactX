






const path=require("path")


module.exports= {

home:(req, res) => {
    res.sendFile(path.resolve('./views/home.html'));
  },

  registro:  (req, res) => {
    res.sendFile(path.resolve('./views/signup.html'));
  },

  login: (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
  },  

  listado: (req, res) => {
    res.sendFile(path.resolve('./views/listado.html'));
  },

  carrito: (req, res) => {
    res.sendFile(path.resolve('./views/carrito.html'));
  },

 detalleProducto:  (req, res) => {
    res.sendFile(path.resolve('./views/producto.html'));
  },
  

formProducto: (req, res) => {
    res.sendFile(path.resolve('./views/formProducto.html'));
  },


}