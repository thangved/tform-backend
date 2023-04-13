/**
 * @type {import('express').ErrorRequestHandler}
 */
const errorHandler = (error, req, res, next) => {
	res.status(error.status || 500).send({ message: error.message });
	next();
};

module.exports = errorHandler;
