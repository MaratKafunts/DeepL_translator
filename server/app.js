require("dotenv").config();
require("./models/model");

const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const router = require("./router/index");

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const startServer = async () => {
	await db.authenticate();
	await db.sync();
	app.listen(port, () => console.log(`Server start on ${port}`));
};

startServer();
