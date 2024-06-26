import boardServices from "../services/boardServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import fetchFromCloudinary from "../helpers/getCloudinaryBackground.js";

import Board from "../models/Board.js";

const createBoard = async (req, res) => {
	const { _id: owner } = req.user;
	const { background } = req.body;

	const boardData = { ...req.body };

	if (background) {
		boardData.backgroundURL = await fetchFromCloudinary(background);
	}

	const result = await boardServices.createBoardService({
		...boardData,
		owner,
	});

	res.status(201).json(result);
};

const editBoard = async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "Body must have at least one field");
	}

	const { id } = req.params;
	const { _id: owner } = req.user;
	const { background } = req.body;

	const updateBoardData = { ...req.body };

	if (background) {
		updateBoardData.backgroundURL = await fetchFromCloudinary(background);
	}

	const result = await boardServices.editBoardService(
		{ owner, _id: id },
		updateBoardData
	);
	if (!result) {
		throw HttpError(404, `Board with id = ${id} not found`);
	}

	res.status(201).json(result);
};

const getOneBoard = async (req, res) => {
	const { id } = req.params;

	const result = await Board.findById(id).populate({
		path: "columns",
		select: {
			_id: 1,
			updatedAt: 1,
			title: 1,
			tasks: 1,
		},
		populate: {
			path: "tasks",
			select: {
				_id: 1,
				title: 1,
				description: 1,
				priority: 1,
				deadline: 1,
			},
		},
	});

	if (!result) {
		throw HttpError(404, `Board with id = ${id} not found`);
	}
	res.json(result);
};
const getAllBoards = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await boardServices.getAllBoardsService({ owner });
	if (!result) {
		throw HttpError(404, `User with id = ${id} not found`);
	}

	res.json({ boards: result });
};

const getBackgroundBoards = async (req, res) => {
	const iconsBackgroundURL = await fetchFromCloudinary("icon");

	res.json({ iconsBackgroundURL: iconsBackgroundURL });
};

const deleteBoard = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await boardServices.deleteBoardService({
		owner,
		_id: id,
	});
	if (!result) {
		throw HttpError(404, `Board with id = ${id} not found`);
	}

	res.status(203).json(`Board with id = ${id} deleted sucssesfull`);
	// res.json(result)
};

export default {
	createBoard: ctrlWrapper(createBoard),
	editBoard: ctrlWrapper(editBoard),
	getOneBoard: ctrlWrapper(getOneBoard),
	getAllBoards: ctrlWrapper(getAllBoards),
	getBackgroundBoards: ctrlWrapper(getBackgroundBoards),
	deleteBoard: ctrlWrapper(deleteBoard),
};
