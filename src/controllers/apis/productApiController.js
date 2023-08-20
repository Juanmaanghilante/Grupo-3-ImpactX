const db = require("../../database/models");
const { Op } = require("sequelize");

const Product = db.Product;
const Category = db.Category;

module.exports = {
  'list': async (req, res) => {
      let response = {}
      try {
        const productosHabilitados = await Product.findAll({ paranoid: true })
            response.meta = {
              status: 200,
              total: productosHabilitados.length,
              url: '/api/products'
          }
            response.data = productosHabilitados
        return res.json(response)

      } catch (error) {
            response.meta = {
              status: 204,
              total: null,
              url: '/api/products'
          }
            response.msg = '¡Ups! Hubo un error, no se encontraron productos'
        return res.json(response)
      }
  },

  create: async (req, res) => {
    let response = {}
    try {
      const productoCrear= await Product.create({
        name: req.body.product,
        category_id: req.body.category,
        price: req.body.price,
        description: req.body.desc,
        image: req.file ? req.file.filename : "product-default.png",
      })
          response.meta = {
            status: 200,
            url: '/api/products/create'
        }
          response.data = productoCrear
      return res.json(response)

    } catch (error) {
          response.meta = {
            status: 204,
            url: '/api/products/create'
        }
          response.msg = '¡Ups! Hubo un error, no se pudo crear el producto'
      return res.json(response)
    }
  },


  destroy: async (req,res) => {
    let response = {}
    try {
      let productId = req.params.id;
      const deleteProduct = await Product.destroy({
        where: { id: productId },
        force: true,
      });
            response.meta = {
              status: 200,
              url: '/api/products/delete/:id'
          }
            response.msg = "Producto eliminado con éxito!"
      return res.json(response)

    } catch (error) {
            response.meta = {
              status: 204,
              url: '/api/products/delete/:id'
          }
            response.msg = '¡Ups! Hubo un error, no se pudo eliminar el producto'
      return res.json(response)
    }
  },
}