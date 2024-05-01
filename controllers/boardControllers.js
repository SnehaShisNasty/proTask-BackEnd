import boardServices from "../services/boardServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const createBoard = async (req, res) => {
	const { _id: owner } = req.user;

	const result = await boardServices.createBoardService({ ...req.body, owner });

	res.status(201).json(result);
};
export default {
	createBoard: ctrlWrapper(createBoard),
};
