/**
 * 全局异常捕获中间件
 * 通过抛出异常的方式给前端返回数据
 * 在中间件中接收到这个错误，格式化数据
 */

 const catchError = async (ctx, next) => {
   try {
     await next()
   } catch (err) {
     const {
       code,
       status,
       msg,
       data
     } = err
     ctx.status = status
     ctx.body = {
       code,
       msg,
       data,
       path: `${ctx.method} ${ctx.path}`
     }
   }
 }
 
 module.exports = catchError;
 