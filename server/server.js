import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

/*
==========================================================
                START SERVER
==========================================================
*/

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("=".repeat(60));
      console.log("🚀 CivicWatch Backend Started");
      console.log(`📍 Environment : ${process.env.NODE_ENV}`);
      console.log(`🌍 Server : http://localhost:${PORT}`);
      console.log("=".repeat(60));
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();