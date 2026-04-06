import express from "express";
import {
	getUsers,
	updateUser,
	deleteUser,
} from "../controllers/userControllers.js";
import { Register } from "../controllers/authControllers.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), Register);
router.get("/", protect, authorize("admin"), getUsers);
router.put("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;