const Koa = require('koa');
const cors = require('cors');
const bodyParser = require('koa-bodyparser');

/**
 * 项目初始化
 */
const initMongoDb = require('./lib/mongoDb');
const {
  setRedisValue,
  getRedisValue,
  client,
} = require('./lib/redisDb');
const initRouter = require('./lib/router');

const app = new Koa();

initMongoDb();

initRouter(app);

//app.use(cors());
app.use(bodyParser());

app.listen(3000, () => {
  console.info('Server established successfully!!!');
});
