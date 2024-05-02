import columnServices from "../services/columnServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const createColumn = async (req, res) => {
	const { _id: owner } = req.user;

	const result = await columnServices.createColumnService({
		...req.body,
		owner,
	});

	res.status(201).json(result);
};

const editColumn = async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "Body must have at least one field");
	}

	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await columnServices.editColumnService(
		{ owner, _id: id },
		req.body
	);
	if (!result) {
		throw HttpError(404, `column with id = ${id} not found`);
	}

	res.json(result);
};

const getAllСolumns = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await columnServices.getAllColumnsService({ owner });

	res.json({ columns: result });
};

const deleteColumn = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await columnServices.deleteColumnService({
		owner,
		_id: id,
	});
	if (!result) {
		throw HttpError(404, `column with id = ${id} not found`);
	}

	res.status(203).json(`column with id = ${id} deleted sucssesfull`);
	// res.json(result)
};

export default {
	createColumn: ctrlWrapper(createColumn),
	editcolumn: ctrlWrapper(editColumn),
	getAllcolumns: ctrlWrapper(getAllСolumns),
	deletecolumn: ctrlWrapper(deleteColumn),
};
