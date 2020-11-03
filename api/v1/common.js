const Router = require('koa-router');
const svgCaptcha = require('svg-captcha');
const {setRedisValue} = require('../../lib/redisDb');
const {NotFoundException} = require('../../lib/exception');

const router = new Router({
  prefix: '/v1/common/',
});

router.get('getCaptcha', async (ctx) => {
  const query = ctx.query
  const sid = query.sid
  const captcha = svgCaptcha.create({
    noise: Math.floor(Math.random()*4+1),
    color: true,
  });
  const {text, data} = captcha;
  // 设置验证码及过期时间
  setRedisValue(sid, text, 60)
  ctx.body = {
    code: '0000',
    msg: '获取验证码成功',
    data: {
      sid,
      text,
      data,
    },
    path: `${ctx.path}`
  };
});

router.get('test', async (ctx) => {
  throw new NotFoundException()
});

module.exports = router;
