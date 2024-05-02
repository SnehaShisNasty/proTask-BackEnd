import Column from "../models/Column.js";

const createColumnService = (data) => Column.create(data);
const editColumnService = (filter, data) =>
	Column.findOneAndUpdate(filter, data, { new: true, runValidators: true });
const getAllColumnsService = (filter = {}) =>
	Column.find(filter, "-createAt -updateAt").populate("board", "_id");
const deleteColumnService = (filter) => Column.findOneAndDelete(filter);

export default {
	createColumnService,
	editColumnService,
	getAllColumnsService,
	deleteColumnService,
};
