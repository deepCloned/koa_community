const Router = require('koa-router');
const {getRedisValue} = require('../../lib/redisDb');
const jwt = require('jsonwebtoken');

const router = new Router({
  prefix: '/v1/auth/',
});

router.post('login', async (ctx) => {
  const {body} = ctx.request
  const {email, password, sid, code} = body
  try {
    const value = await getRedisValue(sid)
    if (!value) {
      ctx.body = {
        code: '10000',
        msg: '验证码已过期',
        data: {
          ...body
        }
      }
    } else if (value !== code) {
      ctx.body = {
        code: '10000',
        msg: '验证码错误',
        data: {
          ...body
        }
      }
    } else if (value === code) {
      const token = jwt.sign({
        email,
        password
      }, 'localhost:3000/v1')
      ctx.body = {
        code: '00000',
        msg: '登录成功',
        data: {
          token,
        }
      }
    }
  } catch(err) {
    ctx.body = 'error'
  }
});

module.exports = router;
