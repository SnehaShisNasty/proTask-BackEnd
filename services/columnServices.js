import Column from "../models/Column.js";

const createColumnService = (data) => Column.create(data);
const editColumnService = (filter, data) =>
	Column.findOneAndUpdate(filter, data, { new: true, runValidators: true });
const deleteColumnService = (filter) => Column.findOneAndDelete(filter);

const getAllColumnsService = (filter = {}) =>
	Column.find(filter, "-createAt -updateAt");

export default {
	createColumnService,
	editColumnService,
	deleteColumnService,
	getAllColumnsService,
};
