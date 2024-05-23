import jwt from "jsonwebtoken";

import { findUserService } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const { ACCESS_SECRET_TOKEN, REFRESH_SECRET_TOKEN } = process.env;
const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return next(HttpError(401, "Authorization header not found"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Authorization header not found"));
  }
  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_TOKEN);
    const user = await findUserService({ _id: id });
    if (!user) {
      return next(HttpError(404, "User not found"));
    }
    if (!user.accessToken) {
      return next(HttpError(401, "Token invalid"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
export default authenticate;
