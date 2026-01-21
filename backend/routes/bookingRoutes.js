import express from "express";
import {getUserOrders, createBooking, cancelBooking, getPendingBookings, acceptBooking, getProviderCompletedOrders, completeBooking, getProviderScheduledOrders} from "../controllers/bookingController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",  protect, createBooking);
router.get("/my", protect, getUserOrders);
router.patch("/:id/cancel", protect, cancelBooking);

router.get("/pending", protect, getPendingBookings);
router.put("/:id/accept", protect, acceptBooking);
router.get("/provider/completed", protect, getProviderCompletedOrders);
router.put("/:id/complete", protect, completeBooking);
router.get(
  "/provider/scheduled",
  protect,
  getProviderScheduledOrders
);



export default router;
