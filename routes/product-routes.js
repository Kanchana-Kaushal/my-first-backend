import express from "express";
import productController from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.get("/", productController.getAll);

productRouter.get("/filter", productController.filter);

productRouter.post("/add", productController.addProducts);

productRouter.delete("/delete", productController.deleteProduct);

productRouter.put("/update", productController.updateProduct);

export default productRouter;
