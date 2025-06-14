import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Correct relative path now

const connection = () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.error("❗ MONGO_URL is undefined. Check your config.env file.");
    return;
  }

  mongoose.connect(uri)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ DB Connection Error:", err);
    });
};

export default connection;
