import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkedAlt,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Home() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    resolved: 0,
    latest: [],
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const res = await api.get("/complaints");

      const complaints = res.data.complaints || [];

      setStats({
        total: complaints.length,
        pending: complaints.filter(
          (c) => c.status === "Pending"
        ).length,
        progress: complaints.filter(
          (c) => c.status === "In Progress"
        ).length,
        resolved: complaints.filter(
          (c) => c.status === "Resolved"
        ).length,
        latest: complaints.slice(0, 5),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#0F4C81,#1565C0,#42A5F5)",
          color: "white",
          padding: "90px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "8px 18px",
                borderRadius: "30px",
                background: "rgba(255,255,255,.15)",
                marginBottom: "25px",
                fontWeight: "600",
              }}
            >
              Smart AI Powered Civic Management
            </div>

            <h1
              style={{
                fontSize: "58px",
                lineHeight: "70px",
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
              Report. Track. Improve Your City.
            </h2>

            <p
              style={{
                lineHeight: "32px",
                fontSize: "18px",
                marginBottom: "40px",
                maxWidth: "600px",
              }}
            >
              CivicWatch AI enables citizens to report civic
              issues like potholes, garbage, drainage,
              streetlight failures and water leakage while
              automatically routing complaints to the correct
              municipal department.
            </p>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/report">
                <button style={primaryBtn}>
                  Report Complaint
                </button>
              </Link>

              <Link to="/map">
                <button style={secondaryBtn}>
                  View Live Map
                </button>
              </Link>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="city"
              style={{
                width: "100%",
                maxWidth: "360px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ================= LIVE STATS ================= */}

      <section
        style={{
          background: "#F5F8FC",
          padding: "70px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0F4C81",
              marginBottom: "50px",
              fontSize: "38px",
            }}
          >
            Live Civic Statistics
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "25px",
            }}
          >
            <StatCard
              icon={<FaClipboardList />}
              title="Total Complaints"
              value={stats.total}
              color="#1565C0"
            />

            <StatCard
              icon={<FaExclamationTriangle />}
              title="Pending"
              value={stats.pending}
              color="#FB8C00"
            />

            <StatCard
              icon={<FaMapMarkedAlt />}
              title="In Progress"
              value={stats.progress}
              color="#D32F2F"
            />

            <StatCard
              icon={<FaCheckCircle />}
              title="Resolved"
              value={stats.resolved}
              color="#2E7D32"
            />
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section
        style={{
          background: "white",
          padding: "80px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0F4C81",
              marginBottom: "20px",
              fontSize: "38px",
            }}
          >
            Report Civic Issues
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "50px",
            }}
          >
            Citizens can quickly report multiple categories
            of civic problems through a single platform.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "25px",
            }}
          >
            <CategoryCard
              emoji="🛣️"
              title="Potholes"
              color="#1976D2"
            />

            <CategoryCard
              emoji="🗑️"
              title="Garbage"
              color="#43A047"
            />

            <CategoryCard
              emoji="💡"
              title="Street Lights"
              color="#F9A825"
            />

            <CategoryCard
              emoji="💧"
              title="Water Leakage"
              color="#00ACC1"
            />

            <CategoryCard
              emoji="🚰"
              title="Drainage"
              color="#7B1FA2"
            />

            <CategoryCard
              emoji="🚧"
              title="Road Damage"
              color="#EF6C00"
            />
          </div>
        </div>
      </section>
            {/* ================= FEATURES ================= */}

      <section
        style={{
          background: "#F5F8FC",
          padding: "80px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0F4C81",
              fontSize: "38px",
              marginBottom: "20px",
            }}
          >
            Why Choose CivicWatch AI?
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "55px",
            }}
          >
            A modern platform designed to make civic issue
            reporting faster, smarter and more transparent.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "30px",
            }}
          >
            <FeatureCard
              title="📍 Live GPS Location"
              text="Automatically captures the user's location while reporting an issue."
            />

            <FeatureCard
              title="🗺 Interactive Map"
              text="Visualize every reported complaint on a real-time interactive city map."
            />

            <FeatureCard
              title="🤖 AI Department Routing"
              text="Automatically assigns complaints to the correct municipal department."
            />

            <FeatureCard
              title="📊 Analytics Dashboard"
              text="Monitor complaint trends, status and overall civic performance."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section
        style={{
          background: "white",
          padding: "80px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0F4C81",
              fontSize: "38px",
              marginBottom: "60px",
            }}
          >
            How CivicWatch AI Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: "30px",
            }}
          >
            <StepCard
              number="1"
              title="Report"
              text="Citizens submit complaints with title, description, image and GPS location."
            />

            <StepCard
              number="2"
              title="AI Analysis"
              text="The platform identifies the complaint category and responsible department."
            />

            <StepCard
              number="3"
              title="Track"
              text="Authorities update complaint status while citizens monitor progress."
            />

            <StepCard
              number="4"
              title="Resolve"
              text="The issue is fixed and marked as resolved, ensuring transparency."
            />
          </div>
        </div>
      </section>

      {/* ================= LATEST COMPLAINTS ================= */}

      <section
        style={{
          background: "#F5F8FC",
          padding: "80px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0F4C81",
              marginBottom: "45px",
              fontSize: "38px",
            }}
          >
            Latest Reported Complaints
          </h2>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <thead
                style={{
                  background: "#0F4C81",
                  color: "white",
                }}
              >
                <tr>
                  <th style={tableHead}>Title</th>
                  <th style={tableHead}>Category</th>
                  <th style={tableHead}>Department</th>
                  <th style={tableHead}>Status</th>
                </tr>
              </thead>

              <tbody>
                {stats.latest.map((item) => (
                  <tr key={item._id}>
                    <td style={tableCell}>{item.title}</td>

                    <td style={tableCell}>
                      {item.category}
                    </td>

                    <td style={tableCell}>
                      {item.department}
                    </td>

                    <td style={tableCell}>
                      <span
                        style={{
                          padding: "7px 15px",
                          borderRadius: "30px",
                          color: "white",
                          fontWeight: "600",
                          background:
                            item.status === "Resolved"
                              ? "#2E7D32"
                              : item.status === "Pending"
                              ? "#FB8C00"
                              : "#D32F2F",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= AI SECTION ================= */}

      <section
        style={{
          background: "white",
          padding: "90px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <FaRobot
              size={220}
              color="#1565C0"
            />
          </div>

          <div>
            <h2
              style={{
                color: "#0F4C81",
                fontSize: "40px",
                marginBottom: "25px",
              }}
            >
              AI Smart Complaint Routing
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: "30px",
                marginBottom: "35px",
              }}
            >
              CivicWatch AI intelligently identifies complaint
              categories and forwards them to the appropriate
              municipal department, reducing manual effort
              and improving response time.
            </p>

            <AIItem
              issue="🛣 Pothole"
              dept="Public Works Department"
            />

            <AIItem
              issue="🗑 Garbage"
              dept="Municipal Sanitation Department"
            />

            <AIItem
              issue="💡 Street Light"
              dept="Electricity Department"
            />

            <AIItem
              issue="💧 Water Leakage"
              dept="Water Supply Department"
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#0F4C81,#1565C0)",
          color: "white",
          padding: "90px 30px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "46px",
            marginBottom: "20px",
          }}
        >
          Help Build Smarter Cities
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto 40px",
            lineHeight: "30px",
            fontSize: "18px",
          }}
        >
          Report civic issues today and become a part of
          creating cleaner, safer and smarter communities
          using technology.
        </p>

        <Link to="/report">
          <button
            style={{
              ...primaryBtn,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Report an Issue
            <FaArrowRight />
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
/* ================= COMPONENTS ================= */

function StatCard({ icon, title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "14px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          color,
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h1
        style={{
          color,
          marginBottom: "10px",
          fontSize: "38px",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: "#555",
          fontWeight: "600",
        }}
      >
        {title}
      </p>
    </div>
  );
}

function CategoryCard({ emoji, title, color }) {
  return (
    <div
      style={{
        background: "white",
        borderTop: `5px solid ${color}`,
        borderRadius: "12px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          fontSize: "55px",
          marginBottom: "15px",
        }}
      >
        {emoji}
      </div>

      <h3
        style={{
          color: "#0F4C81",
        }}
      >
        {title}
      </h3>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          color: "#0F4C81",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#666",
          lineHeight: "28px",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div
      style={{
        background: "#F5F8FC",
        borderRadius: "14px",
        padding: "35px",
        textAlign: "center",
        boxShadow: "0 8px 18px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          background: "#1565C0",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {number}
      </div>

      <h3
        style={{
          color: "#0F4C81",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#666",
          lineHeight: "28px",
        }}
      >
        {text}
      </p>
    </div>
  );
}

function AIItem({ issue, dept }) {
  return (
    <div
      style={{
        background: "#F5F8FC",
        padding: "18px",
        borderRadius: "10px",
        marginBottom: "18px",
        borderLeft: "5px solid #1565C0",
      }}
    >
      <strong>{issue}</strong>

      <br />

      <span
        style={{
          color: "#666",
        }}
      >
        Assigned Department
      </span>

      <br />

      <span
        style={{
          color: "#1565C0",
          fontWeight: "bold",
        }}
      >
        {dept}
      </span>
    </div>
  );
}

/* ================= TABLE ================= */

const tableHead = {
  padding: "16px",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCell = {
  padding: "16px",
  borderBottom: "1px solid #E5E5E5",
};

/* ================= BUTTONS ================= */

const primaryBtn = {
  background: "#FFC107",
  color: "#222",
  border: "none",
  padding: "15px 34px",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  transition: ".3s",
};

const secondaryBtn = {
  background: "transparent",
  color: "white",
  border: "2px solid white",
  padding: "15px 34px",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  transition: ".3s",
};