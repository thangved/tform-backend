const responseFormController = require("@/controllers/response-form.controller");
const { Router } = require("express");

const router = Router();

router.get("/context", responseFormController.getContext);

module.exports = router;
