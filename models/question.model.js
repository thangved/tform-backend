const { Schema, model, Types } = require("mongoose");

const Question = new Schema(
	{
		formId: {
			type: Types.ObjectId,
			ref: "form",
			required: true,
		},
		type: { type: String, default: "text" },
		required: { type: Boolean, default: false },
		content: {
			type: String,
			required: true,
			default: "Nội dung câu hỏi",
		},
		description: { type: String },
		options: { type: [{ type: String, required: true }], default: [] },
		accepts: {
			type: [{ type: String }],
			default: [],
		},
		onlyAccept: {
			type: Boolean,
			default: false,
		},
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = model("question", Question);
