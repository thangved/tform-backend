const authController = require("@/controllers/auth.controller");
const AuthMiddleware = require("@/middleware/auth.middleware");
const { Router } = require("express");

const router = Router();

router
	.route("/")
	.post(authController.login)
	.get(AuthMiddleware, authController.auth);

module.exports = router;
