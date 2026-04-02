const User = require("../models/user.model");
const Order = require("../models/order.model");


// place order
exports.placeOrder = async (req, res) => {
  try {

    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const order = new Order({
      user: userId,
      items: user.cart
    });

    await order.save();

    // empty cart
    user.cart = [];
    await user.save();

    res.json({
      message: "Order placed",
      order
    });

  } catch (error) {
    res.status(500).json(error);
  }
};



// get user orders
exports.getOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.params.userId
    }).populate("items.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json(error);
  }
};