import "./config.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import voteRoutes from "./routes/vote.js";

 // ✅ this enables /api/vote/results


// dotenv.config();

const app = express();

app.use(cors()); // Allow all for simplicity in deployment, can be narrowed later
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);

// Database connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

// Middleware to ensure DB connection for Vercel functions
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

export default app;
