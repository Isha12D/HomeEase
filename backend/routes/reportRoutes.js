import express from "express";
import { createReport, getReports, resolveReport } from "../controllers/reportController.js";
import {protect} from "../middleware/authMiddleware.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);//<----user creates report
router.get("/", protectAdmin, getReports);//<--- admin views all reports
router.put("/:id/resolve", protectAdmin, resolveReport);//<--- admin resolves report

export default router;