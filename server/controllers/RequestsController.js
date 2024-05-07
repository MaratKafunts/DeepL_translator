const { Requests } = require("../models/model");
const { Sequelize } = require("sequelize");

class RequestsController {
	static async create(req, resp) {
		const { translateFrom, translateTo, textToTranslate, resultTranslate } = req.body;
		if (!translateFrom) {
			return resp.status(400).json({ message: "translateFrom required" });
		}
		if (!translateTo) {
			return resp.status(400).json({ message: "translateTo required" });
		}
		if (!textToTranslate) {
			return resp.status(400).json({ message: "textToTranslate required" });
		}
		if (!resultTranslate) {
			return resp.status(400).json({ message: "resultTranslate required" });
		}
		const requests = await Requests.create({
			translateFrom,
			translateTo,
			textToTranslate,
			resultTranslate,
		});
		return resp.status(201).json(requests);
	}
	static async getDaily(req, resp) {
		const today = new Date();
		const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
		const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
		const requests = await Requests.findAll({
			where: {
				createdAt: {
					[Sequelize.Op.between]: [startOfDay, endOfDay],
				},
			},
		});
		return resp.status(200).json(requests);
	}
	static async getMonthly(req, resp) {
		const today = new Date();
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
		const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
		const requests = await Requests.findAll({
			where: {
				createdAt: {
					[Sequelize.Op.between]: [startOfMonth, endOfMonth],
				},
			},
		});
		return resp.status(200).json(requests);
	}
	static async getYearly(req, resp) {
		const today = new Date();
		const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
		const endOfYear = new Date(today.getFullYear(), 12, 0, 23, 59, 59);
		const requests = await Requests.findAll({
			where: {
				createdAt: {
					[Sequelize.Op.between]: [startOfYear, endOfYear],
				},
			},
		});
		return resp.status(200).json(requests);
	}
	static async getCount(req, resp) {
		return resp.status(200).json({ count: await Requests.count() });
	}
}

module.exports = RequestsController;
