import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/register",
        formData
      );

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#0F4C81,#1976D2)",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(420px,1fr))",
            background: "white",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow:
              "0 20px 40px rgba(0,0,0,.2)",
          }}
        >
          {/* LEFT PANEL */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#0F4C81,#1976D2)",
              color: "white",
              padding: "60px 45px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "42px",
                marginBottom: "20px",
              }}
            >
              Join CivicWatch AI
            </h1>

            <h2
              style={{
                fontWeight: "400",
                marginBottom: "25px",
              }}
            >
              Smart Civic Management Platform
            </h2>

            <p
              style={{
                lineHeight: "30px",
                fontSize: "17px",
              }}
            >
              Create your account to report civic
              issues, track complaint progress,
              access dashboards and help build
              smarter, cleaner and safer cities.
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="AI"
              style={{
                width: "220px",
                marginTop: "45px",
                alignSelf: "center",
              }}
            />
          </div>

          {/* RIGHT PANEL */}

          <div
            style={{
              padding: "55px",
            }}
          >
            <h2
              style={{
                color: "#0F4C81",
                marginBottom: "10px",
              }}
            >
              Create Account
            </h2>

            <p
              style={{
                color: "#777",
                marginBottom: "30px",
              }}
            >
              Register to get started.
            </p>

            {error && (
              <div
                style={{
                  background: "#FFEBEE",
                  color: "#C62828",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  background: "#E8F5E9",
                  color: "#2E7D32",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
                            <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <label
                  style={labelStyle}
                >
                  Full Name
                </label>

                <div style={inputWrapper}>
                  <FaUser style={inputIcon} />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <label
                  style={labelStyle}
                >
                  Email Address
                </label>

                <div style={inputWrapper}>
                  <FaEnvelope style={inputIcon} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <label
                  style={labelStyle}
                >
                  Phone Number
                </label>

                <div style={inputWrapper}>
                  <FaPhone style={inputIcon} />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  marginBottom: "30px",
                }}
              >
                <label
                  style={labelStyle}
                >
                  Password
                </label>

                <div
                  style={{
                    ...inputWrapper,
                    position: "relative",
                  }}
                >
                  <FaLock style={inputIcon} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    style={inputStyle}
                  />

                  <span
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "18px",
                      cursor: "pointer",
                      color: "#777",
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#1565C0",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "8px",
                  fontSize: "17px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    <FaUserPlus />
                    Register
                  </>
                )}
              </button>
            </form>

            <div
              style={{
                marginTop: "28px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#666",
                }}
              >
                Already have an account?
              </p>

              <Link
                to="/login"
                style={{
                  color: "#1565C0",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
/* ================= STYLES ================= */

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#333",
};

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #D9D9D9",
  borderRadius: "8px",
  padding: "0 15px",
  background: "#fff",
};

const inputIcon = {
  color: "#1565C0",
  fontSize: "18px",
  marginRight: "12px",
  minWidth: "18px",
};

const inputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  padding: "15px 0",
  fontSize: "16px",
  background: "transparent",
};
            