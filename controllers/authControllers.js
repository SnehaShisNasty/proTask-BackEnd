import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import {
  findUserService,
  createUserService,
  updateUserService,
} from "../services/authServices.js";
import { comparePassword } from "../helpers/comparePassword.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const { ACCESS_SECRET_TOKEN, REFRESH_SECRET_TOKEN } = process.env;
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserService({ email });

  if (user) {
    throw HttpError(409, "Email alreasy in use");
  }
  const img = gravatar.url(email, { s: "250" });

  const hashpasword = await bcrypt.hash(password, 1);

  const newUser = await createUserService({
    ...req.body,
    avatarURL: img,
    password: hashpasword,
  });

  res.status(201).json({
    message: {
      name: newUser.name,
      email: newUser.email,
      img: newUser.avatarURL,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserService({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = comparePassword(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id, name, avatarURL, theme } = user;
  const payload = {
    id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_TOKEN, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_TOKEN, {
    expiresIn: "7d",
  });
  console.log(accessToken);
  await updateUserService({ _id: id }, { accessToken, refreshToken });
  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      name,
      email,
      avatarURL,
      theme,
    },
  });
};
const current = async (req, res) => {
  const { name, email, avatarURL, theme } = req.user;
  res.status(200).json({ message: { name, email, avatarURL, theme } });
};
const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_TOKEN);
    const isExist = await findUserService({ refreshToken: token });
    console.log(token);
    if (!isExist) {
      throw HttpError(401, "Token invalid");
    }
    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, ACCESS_SECRET_TOKEN, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_TOKEN, {
      expiresIn: "7d",
    });
    await updateUserService({ _id: id }, { accessToken, refreshToken });
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUserService({ _id }, { token: "" });
  res.status(204).json({});
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
