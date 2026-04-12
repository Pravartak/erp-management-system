import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createInvoice, getInvoices } from "../controllers/invoiceControllers.js";

const router = express.Router();

router.post("/", protect, createInvoice);
router.get("/", protect, getInvoices);

export default router;