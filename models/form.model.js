const { Schema, model, Types } = require("mongoose");

const Form = new Schema(
	{
		title: {
			type: String,
			required: true,
			default: "Biểu mẫu không có tiêu đề",
		},
		description: {
			type: String,
		},
		userId: {
			type: Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("form", Form);
