const ApiError = require("@/utils/api-error");

/**
 * @type {import('express').RequestHandler}
 */
const AuthMiddleware = async (req, res, next) => {
	try {
		if (!req.currentUser) {
			return next(new ApiError(401, "Unauthorization"));
		}
		next();
	} catch (error) {
		next(error || new ApiError());
	}
};

module.exports = AuthMiddleware;
