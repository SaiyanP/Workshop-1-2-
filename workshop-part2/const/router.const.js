const router = require("express").Router();
const authRouter = require("../routes/auth.routes");
const dishRouter = require("../routes/dish.routes")

router.use(authRouter);
router.use(dishRouter);


module.exports = router;