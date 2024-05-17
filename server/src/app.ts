import axios from "axios";
import express, { Request, Response, Application, urlencoded } from "express";

const cors = require("cors");
const cron = require("node-cron");

const app: Application = express();
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

const userRoutes = require("../routes/user.routes");
const blogRoutes = require("../routes/blog.routes");

app.use(userRoutes);
app.use(blogRoutes);

const port = process.env.PORT || 5000;

app.get("/", async (req: Request, res: Response) => {
  res.send("Server running!");
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

// Added cron

app.get("/ping", (req, res) => {
  res.status(200).json("pong....");
});

const API_ENDPOINT = "https://blog-platform-vq3i.onrender.com";

const makeApiRequest = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (err: any) {
    console.error("API request failed:", err.message);
    throw err;
  }
};

const runApiRequestJob = async () => {
  console.log("Running API request job...");
  try {
    const responseData = await makeApiRequest();
    return responseData;
  } catch (error) {
    return null;
  }
};

cron.schedule("* * * * *", async () => {
  const responseData = await runApiRequestJob();
  if (responseData) {
    // Process the response data here
    console.log("API request successful:", responseData);
  } else {
    console.log("API request failed");
  }
});
