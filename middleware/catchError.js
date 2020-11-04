const { HttpException } = require('../lib/exception');
/**
 * 全局异常捕获中间件
 * 通过抛出异常的方式给前端返回数据
 * 在中间件中接收到这个错误，格式化数据
 */

// const env = process.env.NODE_ENV;
const env = 'development';

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    /**
     * 如果是开发环境下，直接把错误抛出
     * 生产环境下，已知错误按格式抛出
     * 未知错误给一个特定的返回
     */
    /**
     * 如果是已知错误，按照规定格式抛出，返回数据
     * 如果是未知错误，开发环境下直接抛出
     * 生产环境下，返回一个特定的错误
     */
    if (err instanceof HttpException) {
      ctx.body = {
        errorCode: err.errorCode,
        message: err.message,
        path: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = err.code;
    } else {
      if (env === 'development') {
        throw err;
      } else if (env === 'production') {
        ctx.body = {
          errorCode: 99999,
          message: '发生了一个未知错误，请稍后重试',
          path: `${ctx.method} ${ctx.path}`,
        }
        ctx.status = 500;
      }
    }
  }
};
 
 module.exports = catchError;
 