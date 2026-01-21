import Report from "../models/Report.js";
import Booking from "../models/Booking.js";

// create report
export const createReport = async (req, res) => {
  try {
    const { bookingId, reason } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (new Date(booking.date) >= new Date()) {
      return res.status(400).json({ message: "Booking is not overdue yet" });
    }

    const report = await Report.create({
      booking: bookingId,
      reporter: req.user.id,
      provider: booking.provider || null,
      reason: reason || "Provider no-show",
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("booking")
      .populate("reporter", "name email")
      .populate("provider", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Resolve 
export const resolveReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.status = "resolved";
    report.resolvedAt = new Date();
    await report.save();

    res.json({ message: "Report resolved", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
