import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import poRoutes from "./routes/poRoutes.js";
import soRoutes from "./routes/soRoutes.js";
import { authorize, protect } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/purchaseOrders", poRoutes);
app.use("/api/salesOrders", soRoutes);

// MongoDB Connect
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB Connected."))
	.catch((e) => console.log(e));

app.get("/api/protected", protect, (req, res) => {
	res.json({
		msg: "Access granted",
		user: req.user,
	});
});

app.get("/api/admin", protect, authorize("admin"), (req, res) => {
	res.json({
        msg: "Welcome Admin",
        user: req.user
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
