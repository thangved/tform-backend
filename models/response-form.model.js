const { Schema, model, Types } = require("mongoose");

const ResponseForm = new Schema(
	{
		formId: { type: Types.ObjectId, required: true, ref: "form" },
		userId: { type: Types.ObjectId, ref: "user" },
	},
	{ timestamps: true }
);

module.exports = model("response_forms", ResponseForm);
