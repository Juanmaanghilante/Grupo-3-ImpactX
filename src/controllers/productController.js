const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Product = db.Product;
const Category = db.Category;

module.exports = {
  list: async (req, res) => {
    const productosHabilitados = await Product.findAll({ paranoid: true });
    return res.render("products/productList", {
      products: productosHabilitados,
    });
  },
  filterByWord: async (req, res) => {
    try {
      const searchTerm = req.query.search;
      const productosHabilitados = await Product.findAll({
        where: {
          name: {
            [Op.like]: `${searchTerm}%`,
          },
        },
      });

      console.log(productosHabilitados);
      return res.render("products/productList", {
        products: productosHabilitados,
      });
    } catch (error) {
      console.error("Error al buscar productos:", error);
      return res.status(500).send("Error al buscar productos");
    }
  },
  add: async (req, res) => {
    const categories = await Category.findAll();
    return res.render("products/createProduct", { categories: categories });
  },

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await Category.findAll();
      return res.render("products/createProduct", {
        errors: errors.mapped(),
        oldData: { ...req.body },
        categories: categories,
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

  edit: async (req, res) => {
    try {
      let productId = req.params.id;
      let promProduct = await Product.findByPk(productId);
      let categories = await Category.findAll();

      let [productoToEdit, categoriesList] = await Promise.all([
        promProduct,
        categories,
      ]);

      if (productoToEdit) {
        return res.render("products/editProduct", {
          productoEditar: productoToEdit,
          categories: categoriesList,
        });
      } else {
        return res.render("El producto a editar no existe");
      }
    } catch (error) {
      console.log(error);
    }
  },
  update: async(req, res) =>{
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      let categoriesList = await Category.findAll();
      return res.render("products/editProduct", {
        errors: resultValidation.mapped(),
        oldData: req.body,
        id: req.params.id,
        categories: categoriesList
      });
    } else {
      let productId = req.params.id;
      Product.update(
        {
          name: req.body.product,
          category_id: req.body.category,
          price: req.body.price,
          description: req.body.desc,
          image: req.file.filename
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
    Product.destroy({ where: { id: productId }, force: true })
      .then(() => {
        return res.redirect("/productos");
      })
      .catch((error) => res.send(error));
  },
};
