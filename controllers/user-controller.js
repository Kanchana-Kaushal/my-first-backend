import User from "../models/user-model.js";
import convertToHash from "../utils/hash-generator.js";
import variable from "../utils/variables.js";
import argon2 from "argon2";
import { generateToken } from "../utils/token-manager.js";

const userController = {
    async createUser(req, res) {
        const data = req.body;
        const hashedPassword = await convertToHash(data.password);

        const user = new User({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: hashedPassword,
            role: data.role,
        });

        try {
            await user.save();
            res.status(201).json({
                success: true,
                message: "User saved Successfully",
            });
        } catch (err) {
            if (err.code === 11000) {
                res.status(409).json({
                    success: false,
                    message: "Username already exists",
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
        }
    },

    async logInUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });

            //check if the user is banned before continueing
            if (user.banned) {
                res.status(403).json({
                    success: false,
                    banned: user.banned,
                    message: "You are banned from this platform",
                });

                return;
            }

            if (
                await argon2.verify(user.password, password, {
                    secret: Buffer.from(variable.pepper),
                })
            ) {
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                };
                const token =
                    user.role === "admin"
                        ? generateToken(payload, "24h")
                        : generateToken(payload, "24h");

                res.status(200).json({
                    success: true,
                    token: token,
                    user: payload,
                    message: "Logged in successfully",
                });
            } else {
                res.status(404).json({
                    success: false,
                    message:
                        "Password not match, Please try different password",
                });
            }
        } catch {
            res.status(404).json({
                success: false,
                message: "User for this email does not exists",
            });
        }
    },

    async removeUser(req, res) {
        const { email, password } = req.body;

        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        try {
            const user = await User.findOne({ email: email });

            if (
                await argon2.verify(user.password, password, {
                    secret: Buffer.from(variable.pepper),
                })
            ) {
                try {
                    await User.deleteOne({ email: email });
                    res.status(200).json({
                        success: true,
                        message: "User removed successfully",
                    });
                } catch {
                    res.status(404).json({
                        success: false,
                        message: "Something went wrong, please try again later",
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: "Password incorrect",
                });
            }
        } catch {
            res.status(404).json({
                success: false,
                message: "User does not exists",
            });
        }
    },

    async banUser(req, res) {
        if (req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        const { email, banned } = req.body;

        try {
            await User.updateOne(
                { email: email },
                { $set: { banned: banned } }
            );
            res.status(201).json({
                success: true,
                message: "Operation successfull",
            });
        } catch {
            res.status(404).json({
                success: false,
                message: "Something went wrong, please try again later",
            });
        }
    },

    async getAll(req, res) {
        if (req.user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        try {
            const users = await User.find({}, { password: false });
            res.status(200).json({
                success: true,
                users: users,
                message: "operation successful",
            });
        } catch {
            res.status(404).json({
                success: false,
                message: "Something went wrong please try again leter",
            });
        }
    },

    async getOne(req, res) {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "User Unauthorized",
            });

            return;
        }

        try {
            const user = await User.findOne({}, { password: false });
            res.status(200).json({
                success: true,
                users: user,
                message: "operation successful",
            });
        } catch {
            res.status(404).json({
                success: false,
                message: "Something went wrong please try again leter",
            });
        }
    },
};

export default userController;
