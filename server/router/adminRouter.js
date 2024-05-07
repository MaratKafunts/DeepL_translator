const Router = require("express");
const AdminController = require("../controllers/AdminController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");

const router = new Router();

router.post("/login", AdminController.login);
router.get("/check_refresh", authMiddleware, AdminController.check_refresh);

module.exports = router;
