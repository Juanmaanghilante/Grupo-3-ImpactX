const db = require("../../database/models");
const Product = db.Product;

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
            console.error("Error fetching products:", error);
            response.meta = {
              status: 500,
              total: null,
              url: '/api/products'
          }
            response.msg = "Oops! Something went wrong while fetching products."
            return res.status(500).json(response);
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
            status: 201,
            url: '/api/products/create'
        }
          response.data = productoCrear
          return res.json(response)

    } catch (error) {
          console.error("Error creating product:", error);
          response.meta = {
            status: 500,
            url: '/api/products/create'
        }
          response.msg = "Oops! Something went wrong while creating the product. Please try again later."
          return res.status(500).json(response)
    }
  },


  destroy: async (req, res) => {
    let response = {};
    try {
        let productId = req.params.id;
        const deleteProduct = await Product.destroy({
            where: { id: productId }
        });
        if (deleteProduct) {
            response.meta = {
                status: 200,
                url: `/api/products/delete/${productId}`
            };
            response.msg = "Product successfully deleted!";
        } else {
            response.meta = {
                status: 404, 
                url: `/api/products/delete/${productId}`
            };
            response.msg = "Product not found for deletion.";
        }
        return res.json(response);
    } catch (error) {
      console.error("Error deleting product:", error);
        response.meta = {
            status: 500, 
            url: `/api/products/delete/${productId}`
        };
        response.msg = "Oops! Something went wrong while deleting the product. Please try again later.";
        return res.status(500).json(response)
    }
},
}