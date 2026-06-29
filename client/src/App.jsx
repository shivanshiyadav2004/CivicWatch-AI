import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import ReportComplaint from "./pages/ReportComplaint";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/report" element={<ReportComplaint />} />

        <Route path="/map" element={<LiveMap />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;