import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("=".repeat(60));
    console.log("✅ MongoDB Atlas Connected Successfully");
    console.log(`🌐 Host : ${conn.connection.host}`);
    console.log(`📂 Database : ${conn.connection.name}`);
    console.log("=".repeat(60));
  } catch (error) {
    console.error("=".repeat(60));
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("=".repeat(60));

    process.exit(1);
  }
};

export default connectDB;