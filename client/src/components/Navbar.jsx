import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaLandmark } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Live Map", path: "/map" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Login", path: "/login" },
  ];

  return (
    <>
      {/* Top Government Strip */}
      <div
        style={{
          background: "#072F5F",
          color: "#fff",
          padding: "8px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaLandmark />

          <span>Government of India | Smart City Mission</span>
        </div>

        <span>CivicWatch AI v1.0</span>
      </div>

      {/* Main Navbar */}

      <nav
        style={{
          background: "white",
          boxShadow: "0 3px 10px rgba(0,0,0,.1)",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 30px",
          }}
        >
          {/* Logo */}

          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#0F4C81",
                  margin: 0,
                }}
              >
                CivicWatch AI
              </h2>

              <small
                style={{
                  color: "#666",
                }}
              >
                Smart Civic Reporting Platform
              </small>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div
            className="desktopMenu"
            style={{
              display: "flex",
              gap: "25px",
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#0F4C81" : "#444",
                  fontWeight: isActive ? "700" : "500",
                  borderBottom: isActive
                    ? "3px solid #0F4C81"
                    : "none",
                  paddingBottom: "5px",
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "24px",
              display: "none",
            }}
            className="mobileButton"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div
            style={{
              background: "white",
              borderTop: "1px solid #ddd",
              display: "flex",
              flexDirection: "column",
              padding: "15px 30px",
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#0F4C81" : "#444",
                  padding: "12px 0",
                  fontWeight: "600",
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive CSS */}

      <style>{`

        @media(max-width:900px){

          .desktopMenu{

            display:none !important;

          }

          .mobileButton{

            display:block !important;

          }

        }

      `}</style>
    </>
  );
}