const router = require('koa-router')();

router.prefix('/users')

router.post('/login', require("../src/user/login"));
router.post("/register", require("../src/user/register"));

module.exports = router
