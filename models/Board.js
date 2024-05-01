import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";

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
			required: [true, "Background is required"],
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
