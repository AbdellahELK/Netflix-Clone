import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password must be at least 6 caracteres" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(409).json({ success: false, message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({ username, email, password: hashedPassword, image });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            image: newUser.image,
        };

        res.status(201).json({ success: true, user: userResponse });


    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid password" })
        }

        generateTokenAndSetCookie(user._id, res);


        res.status(201).json({ success: true, message: "User logged in successfully" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0
        });

        res.status(201).json({ success: true, user: "User logged out successfully" });

    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ success: false, error: error.message });

    }
}

export const checkAuth = async (req, res) => {
    try {
        console.log("req.user:", req.user);
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.error("Error during checking auth:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}