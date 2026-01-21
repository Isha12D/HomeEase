import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import User from "../models/User.js";

// Create a booking (by user)
export const createBooking = async (req, res) => {
  const { serviceId, city, address, date } = req.body;
  const userId = req.user.id; // ✅ JWT verified

  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  const booking = await Booking.create({
    user: userId,
    service: serviceId,
    city,
    address,
    date,
    price: service.price,
  });

  res.status(201).json(booking);
};



export const getUserOrders = async (req, res) => {
  try {
    
    const orders = await Booking.find({ user: req.user.id })
      .populate("service")
      .populate("provider", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.status === "completed") {
      return res
        .status(400)
        .json({ message: "Completed booking cannot be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





