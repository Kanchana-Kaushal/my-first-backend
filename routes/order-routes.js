import express from "express";
import orderController from "../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.get("/admin/all", orderController.getAllAsAdmin);

orderRouter.get("/", orderController.getAllAsUser);

orderRouter.put("/update", orderController.updateStatus);

orderRouter.post("/place", orderController.placeOrder);

export default orderRouter;
