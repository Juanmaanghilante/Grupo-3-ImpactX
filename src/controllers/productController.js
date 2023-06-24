const fs = require('fs');
const path = require("path")

const rutaBase = path.resolve('./src/database/products.json')
const productos = JSON.parse(fs.readFileSync(rutaBase));

module.exports = {


  productsCart: (req, res) => {
    return res.render('products/cart')
  },

  productsDetail: (req, res) => {
    const productosHabilitados = productos.filter(row => row.isDeleted == false)
    return res.render('products/detalleProductos', { productos: productosHabilitados });
  },

  productsCreate: (req, res) => {
    return res.render('products/formCreate')
  },

  productsCreateProcess: (req, res) => {
    console.log('hola');
    const product = {
      "id": productos.length+1,
      "categoria": req.body.category,
      "nombre": req.body.product,
      "descripcion": req.body.desc,
      "precio": req.body.price,
      "imagen": req.file.filename,
      "isDeleted": false
    };
    fs.writeFileSync(path.resolve(rutaBase), JSON.stringify([...productos, product], null, 2));
    return res.redirect('/');
  },

  productsEdit: (req, res) => {
    return res.render('products/formEdit')
  },

  productsEditProcess: (req, res) => {

  },

  productsDeleteProcess: (req, res) => {
    const productoEliminado = productos.find(row => row.id = req.params.id)

    productoEliminado.isDeleted = true

    fs.writeFileSync(rutaBase, JSON.stringify(productos, null, 2),"utf-8")
    return res.redirect("/productos")
  },


}