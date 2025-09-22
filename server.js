import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URI,
  process.env.ADMIN_URI
];

// ✅ CORS setup
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true); // for Postman or server-to-server requests
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

// Preflight request fallback
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => res.send("🚀 Backend is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
