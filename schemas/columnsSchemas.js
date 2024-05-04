import Joi from "joi";

export const createColumnSchema = Joi.object({
	title: Joi.string().required(),
});

export const editColumnSchema = Joi.object({
	title: Joi.string(),
});
