const Router = require('koa-router');
const {getRedisValue} = require('../../lib/redisDb');
const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const {
  RegisterValidator,
  LoginValidator,
} = require('../../validator/loginValidator');
const {
  ParameterExcetion,
  AlreadyExistException,
  NotFoundException,
  SuccessException,
  UnauthorizedException,
} = require('../../lib/exception');
const {
  generateToken
} = require('../../lib/utils');
const Auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/config').jwtConfig;

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
    const u = await User.getUserByUsername(username)
    if (u.length !== 0) {
      throw new AlreadyExistException()
    } else {
      const user = new User({
        email,
        username,
        password
      })
      await user.save()
      throw new SuccessException('注册成功')
    }
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
    // 密码比对
    const user = await User.findOne({
      username
    })
    if (!user) {
      throw new NotFoundException('该用户不存在')
    }
    const compareRes = bcrypt.compareSync(password, user.password)
    if (!compareRes) {
      throw new UnauthorizedException('密码不正确')
    } else {
      // 颁布令牌
      const token = generateToken({username})
      ctx.token = token
      ctx.body = {
        errorCode: 0,
        data: {
          token,
        },
        message: '登录成功',
        path: `${ctx.method} ${ctx.path}`
      }
    }
  } else {
    throw new ParameterExcetion(errors)
  }
});

/**
 * 测试token
 */
router.post('token', async (ctx, next) => {
  new Auth().validate(ctx, next)
  ctx.body = {
    message: '验证成功',
    username: ctx.username
  }
})

module.exports = router;
