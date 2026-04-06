import express from "express";
import { createSO, deleteSO, getSO, updateSO } from "../controllers/soControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSO);
router.get("/", protect, getSO);
router.put("/:id", protect, updateSO);
router.delete("/:id", protect, deleteSO);

export default router;