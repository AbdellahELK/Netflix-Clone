import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { envVars } from '../config/envVars.js';

export const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token provided" });
        }

        const decoded = jwt.verify(token, envVars.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectedRoutes middleware:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}
