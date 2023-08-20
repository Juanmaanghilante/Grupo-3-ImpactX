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
  }
}