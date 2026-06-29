import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "admin") {
  navigate("/dashboard");
} else {
  navigate("/");
}
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
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
            "linear-gradient(135deg,#0F4C81,#1565C0)",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1050px",
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
              CivicWatch AI
            </h1>

            <h2
              style={{
                fontWeight: "400",
                marginBottom: "25px",
              }}
            >
              Smart Civic Issue Monitoring
            </h2>

            <p
              style={{
                lineHeight: "30px",
                fontSize: "17px",
              }}
            >
              Login to access your dashboard,
              track complaints, monitor civic
              issues and manage reports in one
              intelligent platform.
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
              Welcome Back
            </h2>

            <p
              style={{
                color: "#777",
                marginBottom: "35px",
              }}
            >
              Login to continue
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

            <form
              onSubmit={handleSubmit}
            >
                              <div
                style={{
                  marginBottom: "22px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  marginBottom: "30px",
                  position: "relative",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Password
                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
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
                    top: "46px",
                    cursor: "pointer",
                    color: "#666",
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>
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
                  "Logging in..."
                ) : (
                  <>
                    <FaSignInAlt />
                    Login
                  </>
                )}
              </button>
            </form>

            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              <p
                style={{
                  color: "#666",
                }}
              >
                Don't have an account?
              </p>

              <Link
                to="/register"
                style={{
                  color: "#1565C0",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Create Account
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

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid #D9D9D9",
  borderRadius: "8px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  transition: "0.3s",
  background: "#fff",
};
 