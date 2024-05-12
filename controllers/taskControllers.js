import taskServices from "../services/taskServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import Column from "../models/Column.js";

const createTask = async (req, res) => {
	const { columnId, boardId } = req.params;

	const result = await taskServices.createTaskService({
		...req.body,
		columnId,
		boardId,
	});

	const column = await Column.findById(columnId);

	column.tasks.push(result._id);
	await column.save();
	res.status(201).json(result);
};

const editTask = async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "Body must have at least one field");
	}
	// const { _id: owner } = req.user;
	const { taskId } = req.params;
	const result = await taskServices.editTaskService({ _id: taskId }, req.body);
	if (!result) {
		throw HttpError(404, `Task with id = ${taskId} not found`);
	}

	res.json(result);
};

const getAllTasks = async (req, res) => {
	const { boardId } = req.params;
	const result = await taskServices.getAllTasksService({ boardId });

	if (!result) {
		throw HttpError(404, `Task with id = ${id} not found`);
	}

	res.json({ tasks: result });
};

const deleteTask = async (req, res) => {

	const { taskId, columnId } = req.params;

	// const { _id: owner } = req.user;
	const result = await taskServices.deleteTaskService({
		// owner,
		_id: taskId,
	});
	if (!result) {
		throw HttpError(404, `Task with id = ${taskId} not found`);
	}

	const { _id: id } = result;

	const column = await Column.findById(columnId);
	const deletedTask = column.tasks.findIndex(
		(task) => task.toString() === id.toString()
	);
	column.tasks.splice(deletedTask, 1);
	await column.save();

	res.status(203).json(`Task with id = ${taskId} deleted sucssesfull`);
	// res.json(result)
};

export default {
	createTask: ctrlWrapper(createTask),
	editTask: ctrlWrapper(editTask),
	getAllTasks: ctrlWrapper(getAllTasks),
	deleteTask: ctrlWrapper(deleteTask),
};
