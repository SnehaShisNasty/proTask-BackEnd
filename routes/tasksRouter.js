import express from "express";

import taskControllers from "../controllers/taskControllers.js";

import validateBody from "../decorators/validateBody.js";

import { createTaskSchema, editTaskSchema } from "../schemas/tasksSchema.js";

import { isValidTaskId } from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const taskRouter = express.Router();

taskRouter.use(authenticate);

taskRouter.post(
	"/:columnId",
	validateBody(createTaskSchema),
	taskControllers.createTask
);

taskRouter.put(
	"/:columnId/:taskId",
	isValidTaskId,
	validateBody(editTaskSchema),
	taskControllers.editTask
);

taskRouter.delete(
	"/:columnId/:taskId",
	isValidTaskId,
	taskControllers.deleteTask
);

export default taskRouter;
