import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";
import { backgroundList } from "../constants/board-constants.js";

const boardsShema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
    },
    background: {
      type: String,
      default: "none-background",
      enum: backgroundList,
      required: [true, "Background is required"],
    },
    backgroundURL: {
      type: Object,
      default: {},
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

boardsShema.post("save", handleSaveError);
boardsShema.pre("findOneAndUpdate", setUpdateSetting);

const Board = model("board", boardsShema);

export default Board;
