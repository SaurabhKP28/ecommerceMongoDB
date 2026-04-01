const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [cartSchema]
});


// IMPORTANT: function() to use `this`
userSchema.methods.addToCart = function(productId) {

  const user = this;

  const index = user.cart.findIndex(
    item => item.product.toString() === productId.toString()
  );

  if (index > -1) {
    user.cart[index].quantity += 1;
  } else {
    user.cart.push({
      product: productId,
      quantity: 1
    });
  }

  return user.save();
};

userSchema.methods.removeFromCart = function(productId) {

  const user = this;

  user.cart = user.cart.filter(
    item => item.product.toString() !== productId.toString()
  );

  return user.save();
};

module.exports = mongoose.model("User", userSchema);