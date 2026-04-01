const User = require("../models/user.model");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.addToCart(productId);

    res.status(200).json({
      message: "Product added to cart successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("cart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};