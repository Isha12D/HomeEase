import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    booking: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Booking", 
        required: true 
    },
    reporter: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    provider: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    status: { 
        type: String, 
        enum: ["pending", "resolved"], 
        default: "pending" 
    },
    reason: { 
        type: String, 
        default: "Provider no-show" 
    },
    resolvedAt: { 
        type: Date 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
