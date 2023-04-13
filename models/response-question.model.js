const { Schema, model, Types } = require("mongoose");

const ResponseQuestion = new Schema({
	responseFormId: {
		type: Types.ObjectId,
		required: true,
		ref: "response_form",
	},
	questionId: {
		type: Types.ObjectId,
		required: true,
		ref: "question",
	},
	content: {
		type: String,
	},
	options: {
		type: [{ type: String }],
		default: [],
	},
});

module.exports = model("response_question", ResponseQuestion);
