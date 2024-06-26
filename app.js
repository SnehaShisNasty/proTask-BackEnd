import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import authRouter from "./routes/authRouter.js";
import boardRouter from "./routes/boardRouter.js";
import columnRouter from "./routes/columnsRouter.js";
import taskRouter from "./routes/tasksRouter.js";
import userRouter from "./routes/userRouter.js";

const { DB_HOST, PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/boards/current", columnRouter);
app.use("/boards/current-column", taskRouter);

app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});
mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running. Use our API on port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
