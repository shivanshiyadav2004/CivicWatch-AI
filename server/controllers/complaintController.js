import Complaint from "../models/Complaint.js";

/*
=========================================
Create Complaint
=========================================
*/

export const createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      latitude,
      longitude,
      address,
    } = req.body;

    // Auto Route Complaint
    let department = "";

    switch (category) {
      case "Pothole":
      case "Road Damage":
        department = "Public Works Department";
        break;

      case "Garbage":
        department = "Municipal Sanitation";
        break;

      case "Streetlight":
        department = "Electricity Department";
        break;

      case "Water Leakage":
        department = "Water Supply Department";
        break;

      case "Drainage":
        department = "Drainage Department";
        break;

      default:
        department = "General Department";
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      image: req.body.image || "",
      location: {
        latitude,
        longitude,
        address,
      },
      department,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Complaint Submitted Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================
Get All Complaints
=========================================
*/

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================
Update Complaint Status
=========================================
*/

export const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint Not Found",
      });
    }

    const allowedStatus = [
  "Pending",
  "In Progress",
  "Resolved",
];

if (!allowedStatus.includes(req.body.status)) {
  return res.status(400).json({
    success: false,
    message: "Invalid Status",
  });
}

complaint.status = req.body.status;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================
Delete Complaint
=========================================
*/

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint Not Found",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: "Complaint Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};