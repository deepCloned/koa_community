const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const catchError = require('./middleware/catchError');

/**
 * 项目初始化
 */
// const initMongoDb = require('./lib/mongoDb');
const {
  setRedisValue,
  getRedisValue,
  client,
} = require('./lib/redisDb');
const initRouter = require('./lib/router');

const app = new Koa();

// initMongoDb();
app.use(catchError)

app.use(cors());
app.use(bodyParser());

initRouter(app);

app.listen(3000, () => {
  console.info('Server established successfully!!!');
});
