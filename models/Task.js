import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";

const tasksSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		description: {
			type: String,
			required: [true, "Description is required"],
		},
		priority: {
			type: String,
			required: [true, "Color is required"],
		},
		deadline: {
			type: String,
			required: [true, "Deadline is required"],
		},
		columnId: {
			type: Schema.Types.ObjectId,
			ref: "column",
		},
		boardId: {
			type: Schema.Types.ObjectId,
			ref: "board",
		},
	},
	{ versionKey: false, timestamps: true }
);

tasksSchema.post("save", handleSaveError);
tasksSchema.pre("findOneAndUpdate", setUpdateSetting);

const Task = model("task", tasksSchema);

export default Task;
