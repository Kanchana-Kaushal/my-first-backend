import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    priceCents: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 },
    gender: { type: String, enum: ["mensware", "womensware"], required: true },
    category: {
        type: String,
        required: true,
        enum: [
            "casual Wear",
            "formal Wear",
            "sportsware",
            "outerwear",
            "footwear",
            "accessories",
        ],
    },
    brand: { type: String, required: true },
});

const Product = mongoose.model("products", productSchema);

export default Product;
