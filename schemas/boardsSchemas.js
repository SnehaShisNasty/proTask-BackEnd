import Joi from "joi";

export const boardSchema = Joi.object({
	title: Joi.string().required(),
	icon: Joi.string().required(),
	background: Joi.string().required(),
});
