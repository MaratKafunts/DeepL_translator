const { Sequelize } = require("sequelize");

const db = new Sequelize(
	process.env.NAME_DB,
	process.env.USER_DB,
	process.env.PASSWORD_DB,
	{
		dialect: "mysql",
		host: process.env.HOST_DB,
		port: process.env.PORT_DB,
	}
);

module.exports = db;
