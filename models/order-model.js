import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        customerEmail: { type: String, required: true },
        shippingAddress: { type: String, required: true },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["cod", "card"],
            default: "card",
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                priceCents: { type: Number, required: true },
                qty: { type: Number, required: true, default: 1 },
            },
        ],
    },

    { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
