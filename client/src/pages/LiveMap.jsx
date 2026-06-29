import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.heat";

/* ==========================
   Leaflet Default Marker
========================== */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ==========================
   Heat Layer
========================== */

function HeatLayer({ complaints }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const points = complaints
      .filter(
        (item) =>
          item.location &&
          item.location.latitude &&
          item.location.longitude
      )
      .map((item) => [
        Number(item.location.latitude),
        Number(item.location.longitude),
        1,
      ]);

    if (!points.length) return;

    const heat = L.heatLayer(points, {
      radius: 28,
      blur: 22,
      maxZoom: 18,
      minOpacity: 0.45,
    });

    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [complaints, map]);

  return null;
}

/* ==========================
   Priority Badge
========================== */

function getPriority(category) {
  switch (category) {
    case "Pothole":
    case "Road Damage":
      return {
        text: "High",
        color: "#D32F2F",
      };

    case "Garbage":
    case "Water Leakage":
      return {
        text: "Medium",
        color: "#F9A825",
      };

    default:
      return {
        text: "Low",
        color: "#2E7D32",
      };
  }
}

/* ==========================
   Main Component
========================== */

export default function LiveMap() {
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {
    try {
      setLoading(true);

      const res = await api.get("/complaints");

      const valid = (res.data.complaints || []).filter(
        (item) =>
          item.location &&
          item.location.latitude &&
          item.location.longitude
      );

      setComplaints(valid);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredComplaints = useMemo(() => {
    if (categoryFilter === "All")
      return complaints;

    return complaints.filter(
      (item) =>
        item.category === categoryFilter
    );
  }, [complaints, categoryFilter]);

  if (loading) {
    return (
      <div
        style={{
          padding: "80px",
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Loading Live Map...
      </div>
    );
  }

    return (
    <div
      style={{
        background: "#F4F6F9",
        minHeight: "100vh",
        padding: "25px",
      }}
    >
      {/* ==========================
            Header
      ========================== */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            color: "#0F4C81",
            marginBottom: "10px",
          }}
        >
          🗺 CivicWatch AI Live Complaint Map
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "17px",
          }}
        >
          Smart visualization of reported civic issues across the city
        </p>
      </div>

      {/* ==========================
            Category Filter
      ========================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        >
          <option>All</option>
          <option>Pothole</option>
          <option>Garbage</option>
          <option>Streetlight</option>
          <option>Water Leakage</option>
          <option>Drainage</option>
          <option>Road Damage</option>
          <option>Other</option>
        </select>
      </div>

      {/* ==========================
            Live Map
      ========================== */}

      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={11}
        style={{
          height: "75vh",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer complaints={filteredComplaints} />

        {filteredComplaints.map((item) => (
          <Marker
            key={item._id}
            position={[
              Number(item.location.latitude),
              Number(item.location.longitude),
            ]}
          >
            <Popup>
              <div
                style={{
                  minWidth: "220px",
                }}
              >
                <h3
                  style={{
                    color: "#0F4C81",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>

                <p>
                  <strong>Category :</strong>{" "}
                  {item.category}
                </p>

                <p>
                  <strong>Status :</strong>{" "}
                  {item.status}
                </p>

                <p>
                  <strong>Department :</strong>
                  <br />
                  {item.department}
                </p>

                <p>
                  <strong>Description :</strong>
                  <br />
                  {item.description}
                </p>

                <p>
                  <strong>Priority :</strong>{" "}
                  <span
                    style={{
                      color: getPriority(item.category).color,
                      fontWeight: "bold",
                    }}
                  >
                    {getPriority(item.category).text}
                  </span>
                </p>

                <p>
                  <strong>Address :</strong>
                  <br />
                  {item.location.address ||
                    "Address Not Available"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

            {/* ==========================
            Legend
      ========================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
          marginTop: "25px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          🔴 High Priority
        </div>

        <div
          style={{
            background: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          🟡 Medium Priority
        </div>

        <div
          style={{
            background: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          🟢 Low Priority
        </div>
      </div>

      {/* ==========================
            Summary Cards
      ========================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={cardStyle}
        >
          <h3>Total Complaints</h3>

          <h1>{filteredComplaints.length}</h1>
        </div>

        <div
          style={cardStyle}
        >
          <h3>High Priority</h3>

          <h1>
            {
              filteredComplaints.filter(
                (c) =>
                  c.category === "Pothole" ||
                  c.category === "Road Damage"
              ).length
            }
          </h1>
        </div>

        <div
          style={cardStyle}
        >
          <h3>Resolved</h3>

          <h1>
            {
              filteredComplaints.filter(
                (c) => c.status === "Resolved"
              ).length
            }
          </h1>
        </div>

        <div
          style={cardStyle}
        >
          <h3>Pending</h3>

          <h1>
            {
              filteredComplaints.filter(
                (c) => c.status === "Pending"
              ).length
            }
          </h1>
        </div>
      </div>

      {/* ==========================
            Footer
      ========================== */}

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
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
          CivicWatch AI • Live Monitoring Dashboard
        </p>

        <p>
          MERN Stack | MongoDB Atlas | React Leaflet
        </p>

        <p>
          Smart City Complaint Visualization System
        </p>
      </div>

    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,.08)",
};