const Form = require("@/models/form.model");
const Question = require("@/models/question.model");
const ApiError = require("@/utils/api-error");

class ResponseFormController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getContext(req, res, next) {
		try {
			const existForm = await Form.findById(req.query.formId);
			if (!existForm)
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));

			const questions = await Question.find({ formId: req.query.formId });

			res.send({
				formDetails: existForm.toObject(),
				questions: questions.map((e) => e.toObject()),
			});
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new ResponseFormController();
