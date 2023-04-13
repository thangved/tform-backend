const dbConfig = {
	uri: process.env.MONGODB_URI || "mongodb://localhost:27017/tform",
};

module.exports = dbConfig;
