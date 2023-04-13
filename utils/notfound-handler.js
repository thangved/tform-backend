/**
 * @type {import('express').RequestHandler}
 */
const notFoundHandler = (req, res, next) => {
	res.send(404).send({ message: "Resource not found" });
	next();
};

module.exports = notFoundHandler;
