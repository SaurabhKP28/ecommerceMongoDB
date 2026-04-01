const User = require("../models/user.model");

exports.addToCart = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    await user.addToCart(productId);

    res.json({ message: "Product added to cart" });

  } catch (error) {
    res.status(500).json(error);
  }
};


exports.removeFromCart = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    await user.removeFromCart(productId);

    res.json({ message: "Product removed from cart" });

  } catch (error) {
    res.status(500).json(error);
  }
};


exports.decreaseQuantity = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    await user.decreaseQuantity(productId);

    res.json({ message: "Quantity updated" });

  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getCart = async (req, res) => {
  try {

    const user = await User.findById(req.params.userId)
      .populate("cart.product");

    res.json(user.cart);

  } catch (error) {
    res.status(500).json(error);
  }
};