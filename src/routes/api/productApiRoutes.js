const express = require("express");
const router = express.Router();

const productApiController = require("../../controllers/apis/productApiController");

router.get("/", productApiController.list);
router.get("/:id", productApiController.detail);
router.post("/create", productApiController.create);
router.get("/edit/:id", productApiController.edit);
router.put("/edit/:id", productApiController.update);
router.delete("/delete/:id", productApiController.destroy);

module.exports = router;
