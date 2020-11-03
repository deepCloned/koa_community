/**
 * 定义异常累，在适当的时候抛出异常，再通过中间件接受
 */

class HttpException {
  constructor(code=10000, status=400, msg='出现了一个异常', data={}) {
    this.code = code
    this.status = status
    this.msg = msg
    this.data = data
  }
}
 
class NotFoundException extends HttpException {
  constructor(code=10001, status=404, msg='访问的内容不存在', data={}) {
    super(code, status, msg, data)
  }
}

module.exports = {
  NotFoundException
}
