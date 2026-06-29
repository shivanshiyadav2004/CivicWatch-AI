import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: [
        "Pothole",
        "Garbage",
        "Streetlight",
        "Water Leakage",
        "Drainage",
        "Road Damage",
        "Other"
      ],
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    location: {
      latitude: Number,
      longitude: Number,
      address: String
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved"
      ],
      default: "Pending"
    },

    department: {
      type: String,
      default: ""
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },
  {
    timestamps: true
  }
);

export default mongoose.model("Complaint", complaintSchema);