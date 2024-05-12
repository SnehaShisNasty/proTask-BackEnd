import mongoose from "mongoose";

import columnServices from "../services/columnServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

import Board from "../models/Board.js";
import Column from "../models/Column.js";

const createColumn = async (req, res) => {
	// const { _id: owner } = req.user;
	const { boardId } = req.params;

	const result = await columnServices.createColumnService({
		...req.body,
		boardId,
	});

	// Додавання id колонки в масив columns в колекції board
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
	const { columnId } = req.params;
	console.log(columnId);
	const result = await columnServices.editColumnService(
		{ _id: columnId },
		req.body
	);
	if (!result) {
		throw HttpError(404, `column with id = ${columnId} not found`);
	}

	res.json(result);
};

const switchColumn = async (req, res) => {
	const { columnId } = req.params;
	console.log(columnId);
};

const deleteColumn = async (req, res) => {
	const { columnId, boardId } = req.params;

	const result = await columnServices.deleteColumnService({
		_id: columnId,
	});
	if (!result) {
		throw HttpError(404, `Column with id = ${columnId} not found`);
	}

	const { _id: id } = result;

	const board = await Board.findById(boardId);
	const deletedColumn = board.columns.findIndex(
		(column) => column.toString() === id.toString()
	);

	board.columns.splice(deletedColumn, 1);
	await board.save();

	res.status(203).json(`column with id = ${columnId} deleted sucssesfull`);
};

const getAllСolumns = async (req, res) => {
	const { boardId } = req.params;
	const result = await columnServices.getAllColumnsService({ boardId });

	res.json({ columns: result });
};

const getOnecolumn = async (req, res) => {
	const { columnId } = req.params;
	const result = await Column.findById(columnId).populate({
		path: "tasks",
		select: {
			_id: 1,
			updatedAt: 1,
			title: 1,
			description: 1,
			priority: 1,
			deadline: 1,
		},
	});
	res.json({ columns: result });
};

export default {
	createColumn: ctrlWrapper(createColumn),
	editcolumn: ctrlWrapper(editColumn),
	switchColumn: ctrlWrapper(switchColumn),
	deleteColumn: ctrlWrapper(deleteColumn),
	getAllcolumns: ctrlWrapper(getAllСolumns),
	getOnecolumn: ctrlWrapper(getOnecolumn),
};
