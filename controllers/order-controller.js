import Order from "../models/order-model.js";
import User from "../models/user-model.js";
import Product from "../models/product-model.js";

const orderController = {
    async getAllAsAdmin(req, res) {
        if (!req.user || req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        try {
            const orders = await Order.find();

            const orderDetails = await Promise.all(
                orders.map(async (order) => {
                    const customer = await User.findOne(
                        { email: order.customerEmail },
                        { firstName: 1, lastName: 1, _id: 0 }
                    );

                    const products = await Promise.all(
                        order.products.map(async (product) => {
                            return await Product.findOne({
                                _id: product.productId,
                            });
                        })
                    );

                    return {
                        ...order.toObject(),
                        customer,
                        products,
                    };
                })
            );

            res.status(200).json({
                success: true,
                message: "Product loaded successfully",
                orderDetails,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "error occured",
                error,
            });
        }
    },

    async getAllAsUser(req, res) {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "User Unauthorized",
            });
            return;
        }

        const { email } = req.body;

        try {
            const order = await Order.find({
                customerEmail: email,
            });

            const orderDetails = await Promise.all(
                order.map(async (order) => {
                    const customer = await User.findOne(
                        { email: email },
                        { firstName: 1, lastName: 1, _id: 0 }
                    );
                    const products = await Promise.all(
                        order.products.map(async (product) => {
                            return await Product.findOne({
                                _id: product.productId,
                            });
                        })
                    );

                    return { ...order.toObject(), customer, products };
                })
            );

            res.status(200).json({
                success: true,
                message: "Product loaded successfully",
                orderDetails,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "error occured",
                error,
            });
        }
    },

    async updateStatus(req, res) {
        if (!req.user || req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        const { orderID, status } = req.body;

        try {
            const updateStatus = await Order.updateOne(
                { _id: orderID },
                { $set: { status: status } }
            );

            res.status(200).json({
                success: true,
                message: "Operation successful",
                updateStatus,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "Error occurred",
                error,
            });
        }
    },

    async placeOrder(req, res) {
        if (!req.user) {
            res.status(400).json({
                success: false,
                message: "User Unauthorized",
            });
            return;
        }
        const {
            customerEmail,
            shippingAddress,
            paymentMethod,
            status,
            products,
        } = req.body;

        try {
            const order = new Order({
                customerEmail: customerEmail,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                status: status,
                products: products,
            });

            const saveStatus = await order.save();

            res.status(201).json({
                success: true,
                message: "Operation successful",
                saveStatus,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "Error occurred",
                error,
            });
        }
    },
};

export default orderController;
