const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const { validationResult } = require('express-validator');


const Product = db.Product

module.exports = {
  'list': (req, res) => {
    db.Product.findAll()
        .then(products => {
            res.render('products/productList', { products })
        })
  },
  create: async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.render('products/createProduct', { 
          errors: errors.mapped(),
          oldData: {...req.body} })
      }
      
      Product
        .create({
          name: req.body.product,
          category_id: req.body.category,
          price: req.body.price,
          description: req.body.desc,
          image: req.file ? req.file.filename : "product-default.png",
          
        })
        .then(() => {
          return res.redirect('/productos')
        })
        .catch( error => res.send(error))

  }
}
