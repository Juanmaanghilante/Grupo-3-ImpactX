const fs = require('fs');
const path = require("path")

const { validationResult } = require("express-validator");
const rutaBase = path.resolve('./src/database/products.json')
const productos = JSON.parse(fs.readFileSync(rutaBase));

module.exports = {

  productsCart: (req, res) => {
    return res.render('products/cartProduct')
  },

  productsDetail: (req, res) => {
    const productosHabilitados = productos.filter(row => row.isDeleted == false)
    return res.render('products/detailProduct', { productos: productosHabilitados});
  },

  productsCreate: (req, res) => {
    return res.render('products/createProduct')
  },

  productsCreateProcess: (req, res) => {  
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("products/createProduct", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }    
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
    if(productoEditar){
      return res.render('products/editProduct', { productoEditar: productoEditar });
    }else{
      return res.render('error404');
    }
  },

  productsEditProcess: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("products/editProduct", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        id: req.params.id
      });
    }       
    const productoEditar = productos.find(row => row.id == req.params.id)
    productoEditar.nombre = req.body.product
    productoEditar.descripcion = req.body.desc
    productoEditar.precio = req.body.price
    productoEditar.categoria = req.body.category

    if (req.file) {
      fs.unlinkSync(path.resolve(__dirname, "../../public/img/" + productoEditar.imagen))
      productoEditar.imagen = req.file.filename
    }

    fs.writeFileSync(path.resolve(__dirname, '../database/products.json'), JSON.stringify(productos, null, 2))

    return res.redirect("/productos")
  },

  productsDeleteProcess: (req, res) => {
    const productoEliminado = productos.find(row => row.id == req.params.id)

    productoEliminado.isDeleted = true

    fs.writeFileSync(rutaBase, JSON.stringify(productos, null, 2), "utf-8")
    return res.redirect("/productos")
  },
}