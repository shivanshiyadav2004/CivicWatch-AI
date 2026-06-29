import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaRobot,
  FaCamera,
  FaClipboardList,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const categories = [
  "Pothole",
  "Garbage",
  "Streetlight",
  "Water Leakage",
  "Drainage",
  "Road Damage",
  "Other",
];

function getDepartment(category) {
  switch (category) {
    case "Pothole":
    case "Road Damage":
      return "Public Works Department";

    case "Garbage":
      return "Municipal Sanitation";

    case "Streetlight":
      return "Electricity Department";

    case "Water Leakage":
      return "Water Supply Department";

    case "Drainage":
      return "Drainage Department";

    default:
      return "General Department";
  }
}

export default function ReportComplaint() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        toast.success(
          "Current location captured."
        );
      },
      () => {
        toast.error(
          "Unable to fetch location."
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/complaints",
        formData
      );

      toast.success(
        "Complaint submitted successfully."
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Submission Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Toaster position="top-right" />

      <section
        style={{
          background:
            "linear-gradient(135deg,#0F4C81,#1976D2)",
          padding: "70px 20px",
          minHeight: "90vh",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(420px,1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* LEFT INFORMATION PANEL */}

          <div
            style={{
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "46px",
                marginBottom: "20px",
                color: "white",
              }}
            >
              Report Civic Issue
            </h1>

            <p
              style={{
                lineHeight: "30px",
                fontSize: "17px",
                marginBottom: "35px",
              }}
            >
              Report potholes, garbage,
              drainage problems, water
              leakage and other civic issues.
              CivicWatch AI automatically
              routes your complaint to the
              correct municipal department.
            </p>

            <div style={infoCard}>
              <FaRobot
                size={28}
                color="#1976D2"
              />

              <div>
                <h3>AI Routing</h3>

                <p>
                  {formData.category
                    ? getDepartment(
                        formData.category
                      )
                    : "Select a category to see the assigned department."}
                </p>
              </div>
            </div>

            <div style={infoCard}>
              <FaMapMarkerAlt
                size={28}
                color="#2E7D32"
              />

              <div>
                <h3>GPS Location</h3>

                <p>
                  {formData.latitude
                    ? "Location captured successfully."
                    : "Capture your current location for accurate reporting."}
                </p>
              </div>
            </div>

            <div style={infoCard}>
              <FaClipboardList
                size={28}
                color="#FB8C00"
              />

              <div>
                <h3>Status Tracking</h3>

                <p>
                  Track complaint progress
                  from submission until
                  resolution.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}

          <div
            style={{
              background: "white",
              padding: "35px",
              borderRadius: "16px",
              boxShadow:
                "0 15px 35px rgba(0,0,0,.2)",
            }}
          >
            <h2
              style={{
                color: "#0F4C81",
                marginBottom: "25px",
              }}
            >
              Complaint Details
            </h2>

            <form
              onSubmit={handleSubmit}
            >
                            <input
                type="text"
                name="title"
                placeholder="Complaint Title"
                value={formData.title}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <textarea
                name="description"
                placeholder="Describe the civic issue in detail..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>

              {formData.category && (
                <div
                  style={{
                    background: "#E3F2FD",
                    padding: "18px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    borderLeft:
                      "5px solid #1565C0",
                  }}
                >
                  <strong>
                    🤖 AI Department Routing
                  </strong>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#0F4C81",
                      fontWeight: "600",
                    }}
                  >
                    {getDepartment(
                      formData.category
                    )}
                  </p>
                </div>
              )}

              <input
                type="text"
                name="address"
                placeholder="Complete Address"
                value={formData.address}
                onChange={handleChange}
                style={inputStyle}
              />

              {/* IMAGE */}

              <div
                style={{
                  marginBottom: "25px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  <FaCamera />
                  {" "}Upload Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginTop: "18px",
                      border:
                        "2px solid #ddd",
                    }}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={detectLocation}
                style={locationBtn}
              >
                <FaMapMarkerAlt />

                Capture Current Location
              </button>

              {formData.latitude && (
                <div
                  style={{
                    background: "#E8F5E9",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "25px",
                    marginTop: "20px",
                  }}
                >
                  <strong>
                    📍 GPS Location Captured
                  </strong>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                    }}
                  >
                    Latitude:
                    {" "}
                    {formData.latitude}
                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Longitude:
                    {" "}
                    {formData.longitude}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={submitBtn}
              >
                {loading
                  ? "Submitting Complaint..."
                  : "Submit Complaint"}
              </button>

            </form>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
/* ================= STYLES ================= */

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "20px",
  border: "1px solid #D9D9D9",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  transition: "0.3s",
  color: "#333",
  background: "#fff",
};

const locationBtn = {
  width: "100%",
  background: "#2E7D32",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
};

const submitBtn = {
  width: "100%",
  background: "#1565C0",
  color: "white",
  border: "none",
  padding: "15px",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
};

const infoCard = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  alignItems: "flex-start",
  gap: "18px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.2)",
};
            