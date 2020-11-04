/**
 * 定义异常累，在适当的时候抛出异常，再通过中间件接受
 */

class HttpException extends Error {
  constructor(code=500, errorCode=99999, message='出现了一个异常') {
    super();
    this.code = code;
    this.errorCode = errorCode;
    this.message = message;
  }
}
 
class NotFoundException extends HttpException {
  constructor(message='访问的内容不存在', code=404, errorCode=10001) {
    super(code, errorCode, message);
  }
}

class ForbiddenException extends HttpException {
  constructor(message='禁止访问', code=403, errorCode=10002) {
    super(code, errorCode, message);
  }
}

// 参数验证错误
class ParameterExcetion extends HttpException {
  constructor(message='请求参数有误', code=400, errorCode=10003) {
    super(code, errorCode, message)
  }
}

// xx已存在
class AlreadyExistException extends HttpException {
  constructor(message='用户名已存在', code=400, errorCode=10004) {
    super(code, errorCode, message)
  }
}

// 执行成功
class SuccessException extends HttpException {
  constructor(message='业务执行成功', code=200, errorCode=0) {
    super(code, errorCode, message)
  }
}

module.exports = {
  HttpException,
  NotFoundException,
  ForbiddenException,
  ParameterExcetion,
  AlreadyExistException,
  SuccessException,
};
