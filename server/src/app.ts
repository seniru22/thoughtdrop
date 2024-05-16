import express, { Request, Response, Application, urlencoded } from "express";

const app: Application = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});