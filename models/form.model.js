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
		color: {
			type: String,
			default: "#2196f3",
		},
		requiredLogin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = model("form", Form);
