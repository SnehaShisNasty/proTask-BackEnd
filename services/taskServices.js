import Task from "../models/Task.js";

const createTaskService = (data) => Task.create(data);
const editTaskService = (filter, data) =>
	Task.findOneAndUpdate(filter, data, { new: true, runValidators: true });
const deleteTaskService = (filter) => Task.findOneAndDelete(filter);

export default {
	createTaskService,
	editTaskService,
	deleteTaskService,
};
