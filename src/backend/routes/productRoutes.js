import express from "express";
import {
	createProduct,
	getProducts,
	updateProducts,
	deleteProducts,
} from "../controllers/productControllers.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createProduct);
router.get("/", protect, getProducts);
router.put("/:id", protect, authorize("admin"), updateProducts);
router.delete("/:id", protect, authorize("admin"), deleteProducts);

export default router;