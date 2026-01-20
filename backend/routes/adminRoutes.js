import express from "express";
import { loginAdmin, addService } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-service",protectAdmin, addService);

export default router;
