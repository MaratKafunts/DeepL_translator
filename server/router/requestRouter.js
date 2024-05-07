const Router = require("express");
const RequestsController = require("../controllers/RequestsController");
const authMiddleware = require("../middleware/AuthMiddleware.js");

const router = new Router();

router.post("/", RequestsController.create);
router.get("/daily", authMiddleware, RequestsController.getDaily);
router.get("/monthly", authMiddleware, RequestsController.getMonthly);
router.get("/yearly", authMiddleware, RequestsController.getYearly);
router.get("/", authMiddleware, RequestsController.getCount);

module.exports = router;
