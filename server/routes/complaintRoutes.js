import express from "express";

import {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// Citizen
router.post("/", createComplaint);

// Admin
router.get("/", getComplaints);

router.put("/:id", updateComplaintStatus);

router.delete("/:id", deleteComplaint);

export default router;