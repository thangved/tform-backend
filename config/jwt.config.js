const jwtConfig = {
	secretKey: process.env.JWT_SECRET || "secret key",
};

module.exports = jwtConfig;
