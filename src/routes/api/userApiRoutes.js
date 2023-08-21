const express = require('express');
const router = express.Router();

const userApiController = require('../../controllers/apis/userApiController')


router.get('/', userApiController.list)
router.get('/:id', userApiController.detail)
router.post('/create', userApiController.create)
router.put('/edit/:id', userApiController.update)
router.delete('/delete/:id', userApiController.destroy)


module.exports = router