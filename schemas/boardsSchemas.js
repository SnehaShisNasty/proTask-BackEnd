import Joi from "joi";
import { backgroundList } from "../constants/board-constants.js";

export const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().required(),
  background: Joi.string().required(...backgroundList),
});

export const editBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string(),
  background: Joi.string().valid(...backgroundList),
});
