import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		return next(HttpError(400, `${id} not valid id`));
	}
	next();
};
export const isValidColumnId = (req, res, next) => {
	const { columnId } = req.params;
	if (!isValidObjectId(columnId)) {
		return next(HttpError(400, `${columnId} not valid id`));
	}
	next();
};

export default isValidId;
