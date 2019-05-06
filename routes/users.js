const router = require('koa-router')();

router.prefix('/users')

router.post('/login', require("../src/user/login"));
router.post("/register", require("../src/user/register"));
router.post("/friends", require("../src/user/friends"));
router.post("/msg_list", require("../src/user/msg_list"));

module.exports = router
