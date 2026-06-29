import {
  FaLandmark,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0F4C81",
        color: "#fff",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "auto",
          padding: "50px 30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        {/* About */}

        <div>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaLandmark />
            CivicWatch AI
          </h2>

          <p
            style={{
              lineHeight: "28px",
              color: "#ddd",
            }}
          >
            CivicWatch AI is a smart civic issue reporting platform
            helping citizens report potholes, garbage dumps,
            broken streetlights, water leakage and other public
            issues directly to local authorities.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3>Quick Links</h3>

          <p>🏠 Home</p>

          <p>📝 Report Issue</p>

          <p>🗺 Live Map</p>

          <p>📊 Dashboard</p>

          <p>🔐 Login</p>
        </div>

        {/* Contact */}

        <div>
          <h3>Contact</h3>

          <p>
            <FaMapMarkerAlt /> New Delhi, India
          </p>

          <p>
            <FaPhoneAlt /> +91 1800-000-000
          </p>

          <p>
            <FaEnvelope /> support@civicwatch.ai
          </p>

          <h4
            style={{
              marginTop: "20px",
            }}
          >
            Emergency Helpline
          </h4>

          <p>🚓 Police : 112</p>

          <p>🚑 Ambulance : 108</p>

          <p>🔥 Fire : 101</p>
        </div>

        {/* Social */}

        <div>
          <h3>Developer</h3>

          <p>
            Developed using MERN Stack
          </p>

          <p>
            React • Express • MongoDB • Node.js
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              fontSize: "25px",
            }}
          >
            <FaGithub
              style={{ cursor: "pointer" }}
            />

            <FaLinkedin
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Strip */}

      <div
        style={{
          background: "#072F5F",
          padding: "15px",
          textAlign: "center",
          color: "#ddd",
        }}
      >
        © {year} CivicWatch AI | Smart City Mission |
        Government Inspired Civic Reporting Platform
      </div>
    </footer>
  );
}