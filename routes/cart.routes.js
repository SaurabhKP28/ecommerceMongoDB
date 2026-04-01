const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.post("/decrease", cartController.decreaseQuantity);
router.get("/:userId", cartController.getCart);

module.exports = router;