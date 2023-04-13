const User = require("@/models/user.model");
const ApiError = require("@/utils/api-error");
const { decode } = require("@/utils/jwt");

const auth = async (token) => {
	const decodeUser = decode(token);

	if (!decodeUser) {
		throw new ApiError(401, "Invalid access token");
	}

	const existUser = await User.findById(decodeUser._id);

	if (!existUser) {
		throw new ApiError(401, "Invalid access token");
	}

	return existUser;
};

/**
 * @type {import('express').RequestHandler}
 */
const AuthMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		if (!token) {
			return next(new ApiError(401, "Access token is requried"));
		}

		req.currentUser = await auth(token);
		next();
	} catch (error) {
		next(error || new ApiError());
	}
};

module.exports = AuthMiddleware;
