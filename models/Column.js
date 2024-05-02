import { Schema, model } from "mongoose";
import { setUpdateSetting, handleSaveError } from "./hooks.js";

const columnShema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},

		board: {
			type: Schema.Types.ObjectId,
			ref: "board",
		},
	},
	{ versionKey: false, timestamps: true }
);

columnShema.post("save", handleSaveError);
columnShema.pre("findOneAndUpdate", setUpdateSetting);

const Column = model("column", columnShema);

export default Column;
