const auth = require('../api/v1/auth');

const initRouter = (app) => {
  [auth].forEach((router) => {
    app.use(router.routes())
       .use(router.allowedMethods())
  })
};

module.exports = initRouter;
