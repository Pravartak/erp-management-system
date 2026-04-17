import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// To Register
export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const safeRole = req.user?.role === "admin" ? role || "sales" : "sales";

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: safeRole
        });

        res.json({ msg: "User registered successfully" });
    } catch(e) {
        res.status(500).json({ msg: e.message });
    }
};

// To Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                name: user.name,
                role: user.role
            }
        });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}
