const { firebaseAuth } = require("@/firebase");
const User = require("@/models/user.model");
const ApiError = require("@/utils/api-error");
const { sign } = require("@/utils/jwt");

class AuthController {
	/**
	 * @type {import('express').RequestHandler}
	 */
	async login(req, res, next) {
		try {
			const { token } = req.body;

			const firebaseUser = await firebaseAuth.verifyIdToken(token);

			let existUser = await User.findOne({ email: firebaseUser.email });

			if (!existUser) {
				existUser = await User.create({
					fullName: firebaseUser.name,
					email: firebaseUser.email,
				});
			}

			existUser = existUser.toObject();

			res.send({ token: sign(existUser) });
		} catch (error) {
			next(new ApiError());
		}
	}

	/**
	 * @type {import('express').RequestHandler}
	 */
	async auth(req, res, next) {
		try {
			res.send(req.currentUser);
		} catch (error) {
			next(new ApiError());
		}
	}
}

module.exports = new AuthController();
