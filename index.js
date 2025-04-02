import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import variable from "./utils/variables.js";
import { verifyToken } from "./utils/token-manager.js";
import userRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";
import orderRouter from "./routes/order-routes.js";

dotenv.config();
const app = express();
const PORT = 5000;
const connectionString = variable.connectionString;

//connect to the database
(async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database is not connected");
    }
})();

//middleware
app.use(express.json());
app.use(verifyToken);

//Routes
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);

app.use((req, res) => {
    res.status(404).send("request not found");
});

app.listen(PORT, () => {
    console.log("App is running on PORT " + PORT);
});
