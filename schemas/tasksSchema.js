import Joi from "joi";

export const createTaskSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	priority: Joi.string().required(),
	deadline: Joi.string().required(),
});

export const editTaskSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
	priority: Joi.string(),
	deadline: Joi.string(),
});
