const formController = require("@/controllers/form.controller");
const { Router } = require("express");

const router = Router();

router.route("/").post(formController.create).get(formController.getAll);
router
	.route("/:id")
	.get(formController.getById)
	.put(formController.update)
	.delete(formController.deleteById);

module.exports = router;
