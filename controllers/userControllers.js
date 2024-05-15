import bcrypt from "bcrypt";
import fs from "fs/promises";
import Jimp from "jimp";
import User from "../models/User.js";

const { GMAIL_SEND_TO } = process.env;

import { updateUserService } from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinary.js";
import sendEmail from "../helpers/sendEmail.js";
import mailFile from "../constants/mail-constants.js";

const editTheme = async (req, res) => {
  const { id } = req.user;
  const { theme } = req.body;
  await updateUserService({ _id: id }, { theme });
  res.status(201).json({ message: "Success" });
};

const needHelp = async (req, res) => {
  const { email } = req.user;
  const { description } = req.body;
  const mailToUser = {
    to: email,
    subject: "Task Pro",
    html: `${mailFile}`,
  };
  const mailToUs = {
    to: GMAIL_SEND_TO,
    subject: "Need Help",
    html: `<h1>${email}</h1>
    <p>${description}</p>`,
  };

  await sendEmail(mailToUs);
  await sendEmail(mailToUser);
  res.status(200).json({ message: "Success" });
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

      const uploadOptions = {
        public_id: id,
        folder: "avatars",
      };

      const result = await cloudinary.uploader.upload(
        tempUpload,
        uploadOptions
      );
      avatarURL = result.url;

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
      avatarURL: updatedUser.avatarURL,
    },
  });
};

export default {
  editTheme: ctrlWrapper(editTheme),
  needHelp: ctrlWrapper(needHelp),
  editProfile: ctrlWrapper(editProfile),
};
