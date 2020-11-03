const common = require('../api/v1/common');
const auth = require('../api/v1/auth');

const initRouter = (app) => {
  [common, auth].forEach((router) => {
    app.use(router.routes())
       .use(router.allowedMethods())
  })
};

module.exports = initRouter;
