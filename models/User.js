import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxLength: 1000,
    },
    avatarURL: String,
    theme: {
      type: String,
      default: "light",
      enum: ["light", "dark", "violet"],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSetting);

const User = model("user", userSchema);

export default User;
