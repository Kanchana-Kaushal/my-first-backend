import jwt from "jsonwebtoken";
import variable from "./variables.js";

export function generateToken(payload, expiresIn) {
    return jwt.sign(payload, variable.jwtKey, { expiresIn: expiresIn });
}

export function verifyToken(req, res, next) {
    const tokenString = req.header("Authorization");

    if (tokenString) {
        const token = tokenString.replace("Bearer ", "");

        try {
            const decoded = jwt.verify(token, variable.jwtKey);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({
                success: false,
                err,
            });
        }
    } else {
        next();
    }
}
