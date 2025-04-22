import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cron from "node-cron";
import { connectDB } from "../db/db.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://blog-platform-zeta-five.vercel.app",
    "https://blog-platform-at2g7koor-shreekar11s-projects.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// Routes
import blogRoutes from "../routes/blog.routes.js";
import userRoutes from "../routes/user.routes.js";

app.use(userRoutes);
app.use(blogRoutes);

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("Server running!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

// Health check
app.get("/ping", (req, res) => {
  res.status(200).json("pong....");
});

// Ping self to prevent render.com timeout
const API_ENDPOINT = "https://blog-platform-vq3i.onrender.com";

const makeApiRequest = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (err) {
    console.error("API request failed:", err.message);
    throw new Error("API request failed");
  }
};

const runApiRequestJob = async () => {
  console.log("Running API request job...");
  try {
    const responseData = await makeApiRequest();
    return responseData;
  } catch {
    return null;
  }
};

cron.schedule("* * * * *", async () => {
  const responseData = await runApiRequestJob();
  if (responseData) {
    console.log("API request successful:", responseData);
  } else {
    console.log("API request failed");
  }
});
