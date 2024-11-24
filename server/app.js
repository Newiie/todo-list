
import express from "express";
import cors from "cors";

import projectRouter from "./routes/projects.router.js";
import taskRouter from "./routes/task.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

export  {
    app
};