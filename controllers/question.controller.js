const Form = require("@/models/form.model");
const Question = require("@/models/question.model");
const ApiError = require("@/utils/api-error");

class QuestionController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const existForm = await Form.findOne({
				_id: req.body.formId,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			const newQuestion = await Question.create({
				...req.body,
			});

			res.status(201).send(newQuestion.toObject());
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async update(req, res, next) {
		try {
			delete req.body._id;
			delete req.body.userId;

			const existQuestion = await Question.findOne({
				_id: req.params.id,
			});

			if (!existQuestion) {
				return next(new ApiError(404, "Không tìm thấy câu hỏi"));
			}

			const existForm = await Form.findOne({
				_id: existQuestion.formId,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			await Question.findByIdAndUpdate(req.params.id, req.body);

			res.end();
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getById(req, res, next) {
		try {
			const existQuestion = await Question.findOne({
				_id: req.params.id,
			});

			if (!existQuestion) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			res.send(existQuestion.toObject());
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			const formId = req.query.formId;
			if (!formId) {
				return new ApiError(400, "Vui lòng truyền ?formId");
			}

			const existForm = await Form.findOne({
				_id: formId,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			res.send(
				(await Question.find({ formId })).map((e) => e.toObject())
			);
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async deleteById(req, res, next) {
		try {
			const existQuestion = await Question.findOne({
				_id: req.params.id,
			});

			if (!existQuestion) {
				return next(new ApiError(404, "Không tìm thấy câu hỏi"));
			}

			const existForm = await Form.findOne({
				_id: existQuestion.formId,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			existQuestion.deleteOne();

			res.end();
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new QuestionController();
