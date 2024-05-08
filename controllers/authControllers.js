import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import path from "path";
import User from "../models/User.js";

const { GMAIL_SEND_TO } = process.env;

import {
  findUserService,
  createUserService,
  updateUserService,
} from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinary.js";
import { request } from "http";
import sendEmail from "../helpers/sendEmail.js";

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
  const { _id: id, name } = user;
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
    },
  });
};
const editTheme = async (req, res) => {
  const { id } = req.user;
  const { theme } = req.body;
  await updateUserService({ _id: id }, { theme });
  res.status(201).json({ message: "Success" });
};
const current = async (req, res) => {
  const { name, email, avatarURL, theme } = req.user;
  res.status(200).json({ message: { name, email, avatarURL, theme } });
};
const needHelp = async (req, res) => {
  const { email } = req.user;
  const { description } = req.body;
  const verifyEmail = {
    to: GMAIL_SEND_TO,
    subject: "Need Help",
    html: `<h1>${email}</h1><p>${description} </p>
    `,
  };

  await sendEmail(verifyEmail);
  res.status(200).json({ message: "Success" });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUserService({ _id }, { token: "" });
  res.status(204).json({});
};

const editProfile = async (req, res) => {
  const { id } = req.user;
  const { name, email, password } = req.body;

  const user = await User.findById(id);
  let avatarURL = user.avatarURL;

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (password) {
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Incorrect current password");
    }
  }

  try {
    const tempUpload = req.file?.path;
    if (tempUpload) {
      const image = await Jimp.read(tempUpload);
      await image.cover(250, 250);
      await image.writeAsync(tempUpload);
      ({ url: avatarURL } = await cloudinary.uploader.upload(tempUpload, {
        folder: "avatars",
      }));

      await fs.unlink(tempUpload);
    }
  } catch (error) {
    console.error(error);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      avatarURL,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Profile updated successfully",
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      avatarURL,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  editTheme: ctrlWrapper(editTheme),
  needHelp: ctrlWrapper(needHelp),
  editProfile: ctrlWrapper(editProfile),
};
