import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    service: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Service", 
        required: true 
    },
    provider: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }, 
    city: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    price: { 
        type: 
        Number 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);