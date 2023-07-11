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
    return res.render('products/detalleProductos', { productos: productosHabilitados});
  },

  productsCreate: (req, res) => {
    return res.render('products/formCreate')
  },

  productsCreateProcess: (req, res) => {  
    const nuevoProduct = {
      "id": productos.length + 1,
      "categoria": req.body.category,
      "nombre": req.body.product,
      "descripcion": req.body.desc,
      "precio": req.body.price,
      "imagen": req.file ? req.file.filename : "product-default.png",
      "isDeleted": false
    };

    productos.push(nuevoProduct)

    fs.writeFileSync(path.resolve(rutaBase), JSON.stringify(productos, null, 2), 'utf-8');
    return res.redirect('/productos');
  },

  productsEdit: (req, res) => {
    const productoEditar = productos.find(row => row.id == req.params.id && row.isDeleted == false)
    return res.render('products/formEdit', { productoEditar: productoEditar })
  },

  productsEditProcess: (req, res) => {
    const productoEditar = productos.find(row => row.id == req.params.id)
    productoEditar.nombre = req.body.name
    productoEditar.descripcion = req.body.desc
    productoEditar.precio = req.body.price
    productoEditar.categoria = req.body.categoria

    if (req.file) {
      fs.unlinkSync(path.resolve(__dirname, "../../public/img/" + productoEditar.imagen))
      productoEditar.imagen = req.file.filename
    }

    fs.writeFileSync(path.resolve(__dirname, '../database/products.json'), JSON.stringify(productos, null, 2))
    console.log(req.body);

    return res.redirect("/productos")
  },

  productsDeleteProcess: (req, res) => {
    const productoEliminado = productos.find(row => row.id == req.params.id)

    productoEliminado.isDeleted = true

    fs.writeFileSync(rutaBase, JSON.stringify(productos, null, 2), "utf-8")
    return res.redirect("/productos")
  },
}