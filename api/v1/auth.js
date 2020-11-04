const Router = require('koa-router');
const {getRedisValue} = require('../../lib/redisDb');
const jwt = require('jsonwebtoken');
const User = require('../../model/User')
const {
  RegisterValidator,
  LoginValidator,
} = require('../../validator/loginValidator');
const {
  ParameterExcetion
} = require('../../lib/exception');
const loginValidator = require('../../validator/loginValidator');

const router = new Router({
  prefix: '/v1/auth/',
});

router.post('register', async (ctx) => {
  const {body} = ctx.request
  const {email, username, password, sid, code} = body
  const registerValidator = new RegisterValidator(email, username, password, sid, code)
  registerValidator.validate()
  const {errors} = registerValidator
  if (errors.length === 0) {
    const user = new User({
      email,
      username,
      password
    })
    const saveRes = await user.save()
    ctx.body = registerValidator
  } else {
    throw new ParameterExcetion(errors)
  }
})

router.post('login', async (ctx) => {
  const {body} = ctx.request
  const { username, password, sid, code } = body
  const loginValidator = new LoginValidator(username, password, sid, code)
  loginValidator.validate()
  const { errors } = loginValidator
  if (errors.length === 0) {
    ctx.body = loginValidator
  } else {
    throw new ParameterExcetion(errors)
  }
});

module.exports = router;
