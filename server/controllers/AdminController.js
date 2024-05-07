const { Admin } = require("../models/model");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

class AdminController {
	static async login(req, resp) {
		const { login, password } = req.body;

		if (!login) {
			return resp.status(400).json({ message: "login required field" });
		}

		if (!password) {
			return resp
				.status(400)
				.json({ message: "password required field" });
		}

		const admin = await Admin.findOne({
			where: {
				login,
				password,
			},
		});

		if (admin) {
			const token = jwt.sign({ login }, process.env.SECRET_KEY, {
				expiresIn: "2h",
			});
			return resp.json({ token });
		} else {
			return resp
				.status(404)
				.json({ message: "Incorrect login or password" });
		}
	}

	static async check_refresh(req, resp) {
		const token = jwt.sign({ login: req.login }, process.env.SECRET_KEY, {
			expiresIn: "2h",
		});
		return resp.json({ token });
	}
}

module.exports = AdminController;
