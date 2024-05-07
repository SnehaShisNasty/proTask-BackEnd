import Joi from "joi";

export const createTaskSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	color: Joi.string().required(),
	deadline: Joi.string().required(),
});

export const editTaskSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
	color: Joi.string(),
	deadline: Joi.string(),
});
