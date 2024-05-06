import columnServices from "../services/columnServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

import Board from "../models/Board.js";

const createColumn = async (req, res) => {
	// const { _id: owner } = req.user;
	const { boardId } = req.params;

	const result = await columnServices.createColumnService({
		...req.body,
		boardId,
	});

	const board = await Board.findById(boardId);

	board.columns.push(result._id);
	// Зберігаємо зміни дошки
	await board.save();

	res.status(201).json(result);
};

const editColumn = async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "Body must have at least one field");
	}
	// const { _id: owner } = req.user;
	const { _id: columnId } = req.params;
	const result = await columnServices.editColumnService({ columnId }, req.body);
	if (!result) {
		throw HttpError(404, `column with id = ${columnId} not found`);
	}

	res.json(result);
};

// const getAllСolumns = async (req, res) => {
// 	const { boardId } = req.params;
// 	const result = await columnServices.getAllColumnsService({ boardId });

// 	res.json({ columns: result });
// };

const deleteColumn = async (req, res) => {
	const { columnId } = req.params;
	// const { _id: owner } = req.user;
	const result = await columnServices.deleteColumnService({
		// owner,
		_id: columnId,
	});
	if (!result) {
		throw HttpError(404, `column with id = ${columnId} not found`);
	}

	res.status(203).json(`column with id = ${columnId} deleted sucssesfull`);
	// res.json(result)
};

export default {
	createColumn: ctrlWrapper(createColumn),
	editcolumn: ctrlWrapper(editColumn),
	// getAllcolumns: ctrlWrapper(getAllСolumns),
	deleteColumn: ctrlWrapper(deleteColumn),
};
