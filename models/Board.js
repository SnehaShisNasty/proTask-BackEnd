import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";
import { backgroundList } from "../constants/board-constants.js";

const boardsSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		icon: {
			type: String,
			// default: "dots",
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
		columns: [{ type: Schema.Types.ObjectId, ref: "column" }],
	},
	{ versionKey: false, timestamps: false }
);

boardsSchema.post("save", handleSaveError);
boardsSchema.pre("findOneAndUpdate", setUpdateSetting);

const Board = model("board", boardsSchema);

export default Board;
