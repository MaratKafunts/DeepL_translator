const jwt = require("jsonwebtoken");

function authMiddleware(req, resp, next) {
	const authorization = req.headers.authorization;
	if (authorization) {
		const token = authorization.split(" ")[1];
		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.SECRET_KEY);
				req.login = decoded.login;
				next();
			} catch (e) {
				return resp
					.status(401)
					.json({ message: "You must login again" });
			}
		} else {
			return resp.status(403).json({ message: "Incorrect token" });
		}
	} else {
		return resp
			.status(403)
			.json({ message: "You must registration on login" });
	}
}

module.exports = authMiddleware;
