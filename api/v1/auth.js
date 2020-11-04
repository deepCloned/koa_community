const Router = require('koa-router');
const {getRedisValue} = require('../../lib/redisDb');
const jwt = require('jsonwebtoken');
const {
  LoginValidator
} = require('../../validator/loginValidator');
const {
  ParameterExcetion
} = require('../../lib/exception');

const router = new Router({
  prefix: '/v1/auth/',
});

router.post('login', async (ctx) => {
  const {body} = ctx.request
  const { username, password, sid, code } = body
  const loginValidator = new LoginValidator(username, password, sid, code)
  loginValidator.validate()
  const { errors } = loginValidator
  if (loginValidator.length === 0) {
    ctx.body = loginValidator
  } else {
    throw new ParameterExcetion(errors)
  }
});

module.exports = router;
