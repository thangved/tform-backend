const mongoose = require("mongoose");

class MongoDB {
	async connect(uri) {
		try {
			const client = await mongoose.connect(uri);

			console.log(
				`Connected to mongodb://${client.connection.host}:${client.connection.port}/${client.connection.db.databaseName}`
			);

			return client;
		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = new MongoDB();
