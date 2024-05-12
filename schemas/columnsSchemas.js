import Joi from "joi";

export const createColumnSchema = Joi.object({
	title: Joi.string().required(),
});

export const editColumnSchema = Joi.object({
	title: Joi.string(),
});

export const switchColumnShema = Joi.object({
	taskId: Joi.string().required(),
	newColumnId: Joi.string().required(),
});
