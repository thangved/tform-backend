const jwtConfig = require("@/config/jwt.config");
const jwt = require("jsonwebtoken");

module.exports = {
	sign(payload) {
		return jwt.sign(payload, jwtConfig.secretKey);
	},
	decode(token) {
		return jwt.decode(token, jwtConfig.secretKey);
	},
};
