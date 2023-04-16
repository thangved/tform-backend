const Form = require("@/models/form.model");
const ApiError = require("@/utils/api-error");

class FormController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async create(req, res, next) {
		try {
			const newForm = await Form.create({
				...req.body,
				userId: req.currentUser._id,
			});

			res.status(201).send(newForm.toObject());
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

			const existForm = await Form.findOne({
				_id: req.params.id,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			await Form.findByIdAndUpdate(req.params.id, req.body);

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
			const existForm = await Form.findOne({
				_id: req.params.id,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			await existForm.updateOne({ updatedAt: new Date() });

			res.send(existForm.toObject());
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async getAll(req, res, next) {
		try {
			res.send(
				(
					await Form.find({ userId: req.currentUser._id }).sort({
						updatedAt: "desc",
					})
				).map((e) => e.toObject())
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
			const existForm = await Form.findOne({
				_id: req.params.id,
				userId: req.currentUser._id,
			});

			if (!existForm) {
				return next(new ApiError(404, "Không tìm thấy biểu mẫu"));
			}

			existForm.deleteOne();

			res.end();
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new FormController();
