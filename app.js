const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // max 100 requests per windowMs
});

const router = require("@/routes");
const errorHandler = require("@/utils/error-handler");
const notFoundHandler = require("@/utils/notfound-handler");
const serverConfig = require("@/config/server.config");
const UserMiddleware = require("./middleware/user.middleware");

const app = express();

app.use(limiter);
app.use(cors({ origin: serverConfig.frontendOrigin }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", UserMiddleware, router);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
