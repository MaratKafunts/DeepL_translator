const db = require("../config/db");

const { DataTypes } = require("sequelize");

const Requests = db.define("Requests", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	translateFrom: { type: DataTypes.STRING, allowNull: false },
	translateTo: { type: DataTypes.STRING, allowNull: false },
	textToTranslate: { type: DataTypes.STRING, allowNull: false },
	resultTranslate: { type: DataTypes.STRING, allowNull: false },
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
});

const Admin = db.define("Admin", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	login: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Requests, Admin };
