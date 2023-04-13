class ApiError extends Error {
	constructor(status = 500, message = "Internal server error") {
		super();
		this.status = status;
		this.message = message;
	}
}

module.exports = ApiError;
