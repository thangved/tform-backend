const Form = require("@/models/form.model");
const Question = require("@/models/question.model");
const ResponseForm = require("@/models/response-form.model");
const ResponseQuestion = require("@/models/response-question.model");
const ApiError = require("@/utils/api-error");

class ResponseFormController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async getContext(req, res, next) {
		try {
			const existForm = await Form.findById(req.query.formId);

			if (existForm.requiredLogin && !req.currentUser) {
				return next(
					new ApiError(401, "Vui lòng đăng nhập để điền biểu mẫu này")
				);
			}

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

	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const existForm = await Form.findById(req.body.formId);

			if (existForm.requiredLogin && !req.currentUser) {
				return next(
					new ApiError(401, "Vui lòng đăng nhập để điền biểu mẫu này")
				);
			}

			const newResponseForm = await ResponseForm.create({
				formId: req.body.formId,
			});

			for (const response of req.body.response) {
				const existQuestion = await Question.findOne({
					formId: req.body.formId,
					_id: response.questionId,
				});

				if (!existQuestion) {
					continue;
				}

				await ResponseQuestion.create({
					...response,
					responseFormId: newResponseForm._id,
				});
			}

			res.status(201).send(newResponseForm.toObject());
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const { formId } = req.query;

			const existForm = await Form.findOne({
				_id: formId,
				userId: req.currentUser._id,
			});

			if (!existForm)
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));

			const result = [];
			const responseForms = await ResponseForm.find({ formId });

			for (const responseForm of responseForms) {
				const responses = await ResponseQuestion.find({
					responseFormId: responseForm._id,
				}).populate("questionId");

				result.push({
					responseDetails: responseForm.toObject(),
					responses: responses.map((e) => {
						e = e.toObject();

						e.question = e.questionId;

						delete e.questionId;

						return e;
					}),
				});
			}

			res.send(result);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async deleteById(req, res, next) {
		try {
			const existResponse = await ResponseForm.findById(req.params.id);

			if (!existResponse) {
				return next(new ApiError(404, "Không tìm thấy phản hồi"));
			}

			const existForm = await Form.findOne({
				_id: existResponse.formId,
				userId: req.currentUser._id,
			});

			if (!existForm)
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));

			await existResponse.deleteOne();

			res.end();
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new ResponseFormController();
