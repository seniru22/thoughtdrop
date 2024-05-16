import express, { Request, Response, Application, urlencoded } from "express";

const app: Application = express();
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