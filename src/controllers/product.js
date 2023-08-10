const path = require("path");
const db = require("../database/models");
const { validationResult } = require("express-validator");

const Product = db.Product;
const Category = db.Category;

module.exports = {

  'list': async (req, res) => {
    /*const productosHabilitados = productos.filter(row => row.isDeleted == false)
    return res.render('products/productList', { products: productosHabilitados});*/
    const productosHabilitados = await Product.findAll();
    return res.render('products/productList', { products: productosHabilitados});
  },  
  add: async(req, res) => {
    const categories = await Category.findAll(); 
    return res.render('products/createProduct', {categories: categories})
  },  

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await Category.findAll();    
      return res.render("products/createProduct", {
        errors: errors.mapped(),
        oldData: { ...req.body },
        categories: categories
      });
    }
    try {
      const productoCreado = await Product.create({
        name: req.body.product,
        category_id: req.body.category,
        price: req.body.price,
        description: req.body.desc,
        image: req.file ? req.file.filename : "product-default.png",
      });
      return res.redirect("/productos");
    } catch (error) {
      console.log(error);
    }
  },

  edit: function (req, res) {
    let productId = req.params.id;
    let promProduct = Movies.findByPk(productId);

    Promise.all([promProduct])
      .then(([Product]) => {
        return res.render(
          path.resolve(__dirname, "..", "views", "editProduct"),
          { Product }
        );
      })
      .catch((error) => res.send(error));
  },
  update: function (req, res) {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("products/editProduct", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        id: req.params.id,
      });
    } else {
      let productId = req.params.id;
      Product.update(
        {
          name: req.body.product,
          category_id: req.body.category,
          price: req.body.price,
          description: req.body.desc,
          image: req.file.filename,
        },
        {
          where: { id: productId },
        }
      )
        .then(() => {
          return res.redirect("/productos");
        })
        .catch((error) => res.send(error));
    }
  },

  delete: function (req, res) {
    let productId = req.params.id;
    Product.findByPk(productId)
      .then((Product) => {
        return res.render(
          path.resolve(__dirname, "..", "views", "productList"),
          { Product }
        );
      })
      .catch((error) => res.send(error));
  },
  destroy: function (req, res) {
    let productId = req.params.id;
    Product.destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.redirect("/productos");
      })
      .catch((error) => res.send(error));
  },
};
