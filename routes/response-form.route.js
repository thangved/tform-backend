const responseFormController = require("@/controllers/response-form.controller");
const AuthMiddleware = require("@/middleware/auth.middleware");
const { Router } = require("express");

const router = Router();

router.get("/context", responseFormController.getContext);

router
	.route("/")
	.post(responseFormController.create)
	.get(AuthMiddleware, responseFormController.getAll)
	.delete(AuthMiddleware, responseFormController.deleteAll);

router.route("/:id").delete(AuthMiddleware, responseFormController.deleteById);

module.exports = router;
