const Router = require("express");
const requestsRouter = require("./requestRouter");
const adminRouter = require("./adminRouter");

const router = new Router();

router.use("/requests", requestsRouter);
router.use("/admin", adminRouter);

module.exports = router;
