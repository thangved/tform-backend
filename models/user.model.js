const { Schema, model } = require("mongoose");

const User = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("user", User);
