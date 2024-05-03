import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";

const boardsSchema = new Schema(
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
		columns: [{ type: Schema.Types.ObjectId, ref: "column" }],
	},
	{ versionKey: false, timestamps: true }
);

boardsSchema.post("save", handleSaveError);
boardsSchema.pre("findOneAndUpdate", setUpdateSetting);

const Board = model("board", boardsSchema);

export default Board;
