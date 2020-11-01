const Router = require('koa-router');
const svgCaptcha = require('svg-captcha');

const router = new Router({
  prefix: '/v1/auth/',
});

router.get('getCaptcha', async (ctx) => {
  const captcha = svgCaptcha.create();
  const {text, data} = captcha;
  ctx.body = {
    text,
    data,
  };
});

module.exports = router;
