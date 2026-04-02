const express = require("express");
const mongoose = require("mongoose");

const cartRoutes = require("./routes/cart.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/orders", orderRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});