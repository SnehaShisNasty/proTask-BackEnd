import taskServices from "../services/taskServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import Column from "../models/Column.js";

const createTask = async (req, res) => {
	const { columnId } = req.params;

	const result = await taskServices.createTaskService({
		...req.body,
		columnId,
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
const deleteTask = async (req, res) => {
	// ToDo реалізувати видалення з масиву в колекції колонок
	const { taskId } = req.params;
	// const { _id: owner } = req.user;
	const result = await taskServices.deleteTaskService({
		// owner,
		_id: taskId,
	});
	if (!result) {
		throw HttpError(404, `Task with id = ${taskId} not found`);
	}

	res.status(203).json(`Task with id = ${taskId} deleted sucssesfull`);
	// res.json(result)
};

export default {
	createTask: ctrlWrapper(createTask),
	editTask: ctrlWrapper(editTask),
	deleteTask: ctrlWrapper(deleteTask),
};