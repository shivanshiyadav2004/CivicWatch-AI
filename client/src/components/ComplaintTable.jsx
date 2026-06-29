import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await api.get("/complaints");

      setComplaints(res.data.complaints || []);
    } catch (err) {
      toast.error("Unable to load complaints");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "" || item.category === category;

      const matchStatus =
        status === "" || item.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [complaints, search, category, status]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/complaints/${id}`, {
        status: newStatus,
      });

      toast.success("Status Updated");

      fetchComplaints();
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/complaints/${id}`);

      toast.success("Complaint Deleted");

      fetchComplaints();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading Complaints...
      </h2>
    );

  return (
    <div
      style={{
        marginTop: "40px",
        background: "white",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          color: "#0F4C81",
          marginBottom: "20px",
        }}
      >
        Complaint Management
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={inputStyle}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={inputStyle}
        >
          <option value="">All Categories</option>

          <option>Pothole</option>
          <option>Garbage</option>
          <option>Streetlight</option>
          <option>Water Leakage</option>
          <option>Drainage</option>
          <option>Road Damage</option>
          <option>Other</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={inputStyle}
        >
          <option value="">All Status</option>

          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#0F4C81",
              color: "white",
            }}
          >
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={th}>Department</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((item) => (
              <tr key={item._id}>
                <td style={td}>{item.title}</td>

                <td style={td}>
                  {item.category}
                </td>

                <td style={td}>
                  {item.department}
                </td>

                <td style={td}>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(
                        item._id,
                        e.target.value
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>

                <td style={td}>
                  <button
                    onClick={() =>
                      deleteComplaint(item._id)
                    }
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  minWidth: "180px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const th = {
  padding: "14px",
  textAlign: "left",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
};

const deleteBtn = {
  background: "#D32F2F",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};