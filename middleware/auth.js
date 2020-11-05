const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/config').jwtConfig;
const {
  UnauthorizedException
} = require('../lib/exception');

class Auth {
  constructor() {}
  /**
   * 验证token是否合法
   */
  validate(ctx, next) {
    const token = this._getToken(ctx)
    let validateRes
    try {
      validateRes = jwt.verify(token, jwtConfig.secretKey)
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('token已失效，请重新登陆获取', 401, 10007)
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('token错误，请重新获取', 401, 10007)
      }
    }
    // 验证成功，把用户名绑定到ctx上，后面可以方便使用
    ctx.username = validateRes.username
    next()
  }
  // 从header中获取token
  _getToken(ctx) {
    const {header} = ctx
    const token = header.authorization.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('token不存在', 410, 10006)
    }
    return token;
  }
}

module.exports = Auth;
