const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Product = db.Product;
const Category = db.Category;

module.exports = {
  productsCart: async (req, res) => {
    try {
      return res.render("products/cartProduct");
    } catch (error) {
      console.log(error);
    }
  },  
  list: async (req, res) => {
    try {
      const productosHabilitados = await Product.findAll({ paranoid: true });
      return res.render("products/productList", {
        products: productosHabilitados,
      });
    } catch (error) {
      console.log(error);
    }
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
      return res.render("products/productList", {
        products: productosHabilitados,
      });
    } catch (error) {
      console.error("Error al buscar productos:", error);
      return res.status(500).send("Error al buscar productos");
    }
  },
  add: async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.render("products/createProduct", { categories: categories });
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categories = await Category.findAll();
        return res.render("products/createProduct", {
          errors: errors.mapped(),
          oldData: { ...req.body },
          categories: categories,
        });
      }
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
        return res.render("The product to edit does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        let categoriesList = await Category.findAll();
        return res.render("products/editProduct", {
          errors: resultValidation.mapped(),
          oldData: req.body,
          id: req.params.id,
          categories: categoriesList,
        });
      }

      let productId = req.params.id;
      const editProduct = await Product.update(
        {
          name: req.body.product,
          category_id: req.body.category,
          price: req.body.price,
          description: req.body.desc,
          image: req.file ? req.file.filename : "product-default.png",
        },
        {
          where: { id: productId },
        }
      );
      return res.redirect("/productos");
    } catch (error) {
      console.log(error);
    }
  },
  destroy: async (req, res) => {
    try {
      let productId = req.params.id;
      const deleteProduct = await Product.destroy({
        where: { id: productId },
        force: false,
      });
      return res.redirect("/productos");
    } catch (error) {
      console.log(error);
    }
  },
  buyProcess: async(req, res)=> {
    let detalleCompra = {
      id_user: req.session.userLogged.id,
      total: req.body.total,
      productos: req.body.productos,
      fecha: new Date()
    }
    res.send(detalleCompra)
  }
};
