import express from "express";
import {getUserOrders, createBooking, cancelBooking} from "../controllers/bookingController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",  protect, createBooking);
router.get("/my", protect, getUserOrders);
router.patch("/:id/cancel", protect, cancelBooking);

export default router;
