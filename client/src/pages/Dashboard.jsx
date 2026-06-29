import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import ComplaintTable from "../components/ComplaintTable";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      setLoading(true);

      const res = await api.get("/complaints");

      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  /* ==========================
        Dashboard Statistics
     ========================== */

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const progressComplaints = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const potholes = complaints.filter(
    (c) => c.category === "Pothole"
  ).length;

  const garbage = complaints.filter(
    (c) => c.category === "Garbage"
  ).length;

  const streetlights = complaints.filter(
    (c) => c.category === "Streetlight"
  ).length;

  const waterLeakage = complaints.filter(
    (c) => c.category === "Water Leakage"
  ).length;

  const drainage = complaints.filter(
    (c) => c.category === "Drainage"
  ).length;

  const roadDamage = complaints.filter(
    (c) => c.category === "Road Damage"
  ).length;

  /* ==========================
        Pie Chart
     ========================== */

  const pieData = useMemo(() => ({
    labels: [
      "Pothole",
      "Garbage",
      "Streetlight",
      "Water Leakage",
      "Drainage",
      "Road Damage",
    ],
    datasets: [
      {
        label: "Complaints",
        data: [
          potholes,
          garbage,
          streetlights,
          waterLeakage,
          drainage,
          roadDamage,
        ],
      },
    ],
  }), [
    potholes,
    garbage,
    streetlights,
    waterLeakage,
    drainage,
    roadDamage,
  ]);

  /* ==========================
        Bar Chart
     ========================== */

  const barData = useMemo(() => ({
    labels: [
      "Pending",
      "Resolved",
      "In Progress",
    ],
    datasets: [
      {
        label: "Complaint Status",
        data: [
          pendingComplaints,
          resolvedComplaints,
          progressComplaints,
        ],
      },
    ],
  }), [
    pendingComplaints,
    resolvedComplaints,
    progressComplaints,
  ]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#F4F6F9",
        minHeight: "100vh",
        padding: "35px",
      }}
    >
      {/* ==========================
            Header
      ========================== */}

      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            color: "#0F4C81",
            marginBottom: "10px",
          }}
        >
          🏛 CivicWatch AI Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "17px",
          }}
        >
          Smart City Complaint Monitoring & Analytics
        </p>
      </div>

      {/* ==========================
            Statistics
      ========================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <StatCard
          title="Total Complaints"
          value={totalComplaints}
          color="#1565C0"
        />

        <StatCard
          title="Pending"
          value={pendingComplaints}
          color="#F9A825"
        />

        <StatCard
          title="Resolved"
          value={resolvedComplaints}
          color="#2E7D32"
        />

        <StatCard
          title="In Progress"
          value={progressComplaints}
          color="#D32F2F"
        />
      </div>

      {/* ==========================
            Charts
      ========================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(400px,1fr))",
          gap: "30px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#0F4C81",
            }}
          >
            Complaint Categories
          </h3>

          <Pie data={pieData} />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#0F4C81",
            }}
          >
            Complaint Status
          </h3>

          <Bar data={barData} />
        </div>
      </div>

      {/* ==========================
            Quick Summary
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,.08)",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            color: "#0F4C81",
            marginBottom: "20px",
          }}
        >
          Dashboard Summary
        </h2>

        <ul
          style={{
            lineHeight: "35px",
            fontSize: "17px",
            color: "#444",
          }}
        >
          <li>Total Complaints : {totalComplaints}</li>

          <li>Resolved : {resolvedComplaints}</li>

          <li>Pending : {pendingComplaints}</li>

          <li>Currently In Progress : {progressComplaints}</li>

          <li>
            Most Reported Category :
            {" "}
            {[
              {
                name: "Pothole",
                count: potholes,
              },
              {
                name: "Garbage",
                count: garbage,
              },
              {
                name: "Streetlight",
                count: streetlights,
              },
              {
                name: "Water Leakage",
                count: waterLeakage,
              },
              {
                name: "Drainage",
                count: drainage,
              },
              {
                name: "Road Damage",
                count: roadDamage,
              },
            ].sort((a, b) => b.count - a.count)[0].name}
          </li>
        </ul>
      </div>
            {/* ==========================
            Complaint Management
      ========================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div>
            <h2
              style={{
                color: "#0F4C81",
                margin: 0,
              }}
            >
              Complaint Management
            </h2>

            <p
              style={{
                marginTop: "6px",
                color: "#666",
              }}
            >
              Monitor, update and resolve citizen complaints.
            </p>
          </div>

          <div
            style={{
              background: "#0F4C81",
              color: "white",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Total Records : {totalComplaints}
          </div>
        </div>

        <ComplaintTable />
      </div>

      {/* ==========================
            Footer Information
      ========================== */}

      <div
        style={{
          marginTop: "45px",
          textAlign: "center",
          color: "#666",
          fontSize: "15px",
        }}
      >
        <hr
          style={{
            marginBottom: "20px",
          }}
        />

        <p>
          CivicWatch AI • Smart City Complaint Management System
        </p>

        <p>
          MERN Stack | MongoDB Atlas | React | Express | Node.js
        </p>

        <p>
          Developed for Smart India Civic Reporting Challenge
        </p>
      </div>

    </div>
  );
}

