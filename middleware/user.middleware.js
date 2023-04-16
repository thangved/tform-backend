const User = require("@/models/user.model");
const ApiError = require("@/utils/api-error");
const { decode } = require("@/utils/jwt");

const auth = async (token) => {
	try {
		const decodeUser = decode(token);

		if (!decodeUser) {
			throw new ApiError(401, "Invalid access token");
		}

		const existUser = await User.findById(decodeUser._id);

		if (!existUser) {
			throw new ApiError(401, "Invalid access token");
		}

		return existUser;
	} catch (error) {
		return null;
	}
};

const UserMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (token) {
			req.currentUser = await auth(token);
		}

		next();
	} catch (error) {
		next(new ApiError());
	}
};

module.exports = UserMiddleware;
