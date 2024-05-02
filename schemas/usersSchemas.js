import Joi from "joi";
import {
  nameRegex,
  emailRegepxp,
  passwordRegex,
} from "../constants/user-constants.js";

export const userRegisterSchema = Joi.object({
  name: Joi.string().required(nameRegex),
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export const userEditThemeSchema = Joi.object({
  theme: Joi.string().valid("light", "dark", "violet").required(),
});
