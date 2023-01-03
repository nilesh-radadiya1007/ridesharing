const { Router } = require("express");
const router = Router();

const authRoute = require(`./auth/router`);
const ridesRoute = require(`./rides/router`);

router.use('/auth', authRoute)
router.use('/rides',ridesRoute)

module.exports = router;
