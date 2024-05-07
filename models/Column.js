import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";

const columnSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},

		boardId: {
			type: Schema.Types.ObjectId,
			ref: "board",
		},
		tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
	},
	{ versionKey: false, timestamps: true }
);

columnSchema.post("save", handleSaveError);
columnSchema.pre("findOneAndUpdate", setUpdateSetting);

const Column = model("column", columnSchema);

export default Column;
