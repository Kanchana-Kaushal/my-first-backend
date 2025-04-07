import Product from "../models/product-model.js";

const productController = {
    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json({
                success: true,
                products: products,
                message: "operation successful",
            });
        } catch {
            res.status(404).json({
                success: false,
                message: "Something went wrong please try again leter",
            });
        }
    },

    async filter(req, res) {
        const { category, gender, maxprice, minprice, brand } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (gender) filter.gender = gender;
        if (brand) filter.brand = brand;
        if (minprice && !maxprice)
            filter.priceCents = { $gte: Number(minprice) };
        if (maxprice && !minprice)
            filter.priceCents = { $lte: Number(maxprice) };
        if (maxprice && minprice)
            filter.priceCents = {
                $lte: Number(maxprice),
                $gte: Number(minprice),
            };

        try {
            const products = await Product.find(filter || null);
            res.status(200).json({
                success: true,
                products: products,
                message: "operation successful",
            });
        } catch {
            res.status(500).json({
                success: false,
                message: "Something went wrong please try again leter",
            });
        }
    },

    async addProducts(req, res) {
        console.log(req.user);

        if (!req.user || req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        const data = req.body;

        const product = new Product({
            name: data.name,
            priceCents: Number(data.priceCents),
            description: data.description,
            stock: Number(data.stock) || 1,
            gender: data.gender,
            category: data.category,
            brand: data.brand,
        });

        try {
            const productDetails = await product.save(product);
            res.status(201).json({
                success: true,
                productDetails: productDetails,
                message: "Product saved successfully",
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "Something went wrong",
            });
        }
    },

    async deleteProduct(req, res) {
        if (!req.user || req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        const { _id } = req.body;

        try {
            const deletionData = await Product.deleteOne({ _id: _id });
            if (deletionData > 0) {
                res.status(204).json({
                    success: true,
                    message: "Product deleted successfully",
                    deletionData,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: "Product is already deleted or does not exists",
                    deletionData,
                });
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "something went wrong",
                err,
            });
        }
    },

    async updateProduct(req, res) {
        if (!req.user || req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        const { _id, update } = req.body;

        try {
            const updateStatus = await Product.updateOne(
                { _id: _id },
                { $set: update }
            );

            if (updateStatus.matchedCount > 0) {
                updateStatus.modifiedCount > 0
                    ? res.status(200).json({
                          success: true,
                          message: "Product updated successfully",
                          updateStatus,
                      })
                    : res.status(200).json({
                          success: false,
                          message: "Product is already updated",
                          updateStatus,
                      });
            } else {
                res.status(200).json({
                    success: false,
                    message: "Product does not exists",
                });
            }
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "something went wrong",
                err,
            });
        }
    },
};

export default productController;
