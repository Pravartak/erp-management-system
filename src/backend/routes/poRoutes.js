import express from "express";
import { createPO, deletePO, getPO, updatePO } from "../controllers/poControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPO);
router.get("/", protect, getPO);
router.put("/:id", protect, updatePO);
router.delete("/:id", protect, deletePO);

export default router;