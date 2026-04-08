import express from "express";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { createGRN, getGRN } from "../controllers/grnControllers.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getGRN);
router.post("/", protect, authorize("admin"), createGRN);

export default router;