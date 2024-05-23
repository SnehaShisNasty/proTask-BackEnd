import Joi from "joi";
import {
  nameRegex,
  emailRegexp,
  passwordRegex,
} from "../constants/user-constants.js";

export const authRegisterSchema = Joi.object({
  name: Joi.string().required(nameRegex),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export const authRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
