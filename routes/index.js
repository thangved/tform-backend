const AuthMiddleware = require("@/middleware/auth.middleware");
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/forms", AuthMiddleware, require("./form.route"));
router.use("/questions", AuthMiddleware, require("./question.route"));

module.exports = router;
