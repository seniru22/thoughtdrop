import express, { Request, Response, Application, urlencoded } from "express";

const cors = require("cors");

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

const userRoutes = require('../routes/user.routes');
const blogRoutes = require('../routes/blog.routes');

app.use(userRoutes);
app.use(blogRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});