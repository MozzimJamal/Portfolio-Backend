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
const allowedOrigins = [process.env.FRONTEND_URI, process.env.ADMIN_URI];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman or server-to-server)
    if(!origin) return callback(null, true);

    if(allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"], // preflight methods
  credentials: true,
}));

// Preflight OPTIONS request handle
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
