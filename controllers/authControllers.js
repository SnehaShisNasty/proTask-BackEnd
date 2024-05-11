import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import {
  findUserService,
  createUserService,
  updateUserService,
} from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserService({ email });

  if (user) {
    throw HttpError(409, "Email alreasy in use");
  }
  const img = gravatar.url(email, { s: "250" });

  const hashpasword = await bcrypt.hash(password, 10);

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

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id, name, avatarURL, theme } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await updateUserService({ _id: id }, { token });
  res.status(200).json({
    token,
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

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUserService({ _id }, { token: "" });
  res.status(204).json({});
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
