const express = require('express');
const router = express.Router();

const productApiController = require('../../controllers/apis/productApiController')

router.get('/', productApiController.list)
router.post('/create', productApiController.create)
router.delete('/delete/:id', productApiController.destroy)


module.exports = router