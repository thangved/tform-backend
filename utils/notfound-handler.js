const ApiError = require("./api-error");

/**
 * @type {import('express').RequestHandler}
 */
const notFoundHandler = (req, res, next) => {
	next(new ApiError(404, "Resource not found"));
};

module.exports = notFoundHandler;
