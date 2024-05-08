import express from "express";
import columnsControllers from "../controllers/columnControllers.js";

import validateBody from "../decorators/validateBody.js";
import {
	createColumnSchema,
	editColumnSchema,
} from "../schemas/columnsSchemas.js";

import { isValidColumnId } from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const columnRouter = express.Router();

columnRouter.use(authenticate);

// columnRouter.get("/:boardId", columnsControllers.getAllcolumns);

columnRouter.post(
	"/:boardId",
	validateBody(createColumnSchema),
	columnsControllers.createColumn
);

columnRouter.put(
	"/:boardId/:columnId",
	isValidColumnId,
	validateBody(editColumnSchema),
	columnsControllers.editcolumn
);

columnRouter.delete(
	"/:boardId/:columnId",
	isValidColumnId,
	columnsControllers.deleteColumn
);

export default columnRouter;
