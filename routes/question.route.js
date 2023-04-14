const questionController = require("@/controllers/question.controller");
const { Router } = require("express");

const router = Router();

router
	.route("/")
	.post(questionController.create)
	.get(questionController.getAll);

router
	.route("/:id")
	.get(questionController.getById)
	.put(questionController.update)
	.delete(questionController.deleteById);

module.exports = router;
