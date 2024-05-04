import Joi from "joi";
import {
  nameRegex,
  emailRegexp,
  passwordRegex,
} from "../constants/user-constants.js";

export const userRegisterSchema = Joi.object({
  name: Joi.string().required(nameRegex),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export const userEditThemeSchema = Joi.object({
  theme: Joi.string().valid("light", "dark", "violet").required(),
});
export const userProfileEditSchema = Joi.object({
  name: Joi.string().pattern(nameRegex),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().pattern(passwordRegex).required(),
});
