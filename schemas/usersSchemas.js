import Joi from "joi";
import {
  nameRegex,
  emailRegexp,
  passwordRegex,
} from "../constants/user-constants.js";

export const userEditThemeSchema = Joi.object({
  theme: Joi.string().valid("light", "dark", "violet").required(),
});
export const userNeedHelpSchema = Joi.object({
  description: Joi.string().required(),
  email: Joi.string().required(),
});
export const userProfileEditSchema = Joi.object({
  name: Joi.string().pattern(nameRegex),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().pattern(passwordRegex).required(),
});
