class Validator {
  constructor() {
    this.errors = []
  }
  failed(err) {
    this.errors.push(err)
  }
}

class RegisterValidator extends Validator {
  constructor(email, username, password, sid, code) {
    super()
    this.email = email
    this.username = username
    this.password = password
    this.sid = sid
    this.code = code
  }
  validate() {
    if (!this.email) {
      this.failed('邮箱不能为空')
    } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
      this.failed('请输入正确的邮箱')
    }
    if (!this.username) {
      this.failed('用户名不能为空')
    }
    if (!this.password) {
      this.failed('密码不能为空')
    } else if (this.password.length < 6) {
      this.failed('密码不得少于6位')
    }
    // sid
    if (!this.sid) {
      this.failed('uuid不能为空')
    }
    // code 验证码
    if (!this.code) {
      this.failed('验证码不能为空')
    }
  }
}

class LoginValidator extends Validator {
  constructor(username, password, sid, code) {
    super()
    this.username = username
    this.password = password
    this.sid = sid
    this.code = code
  }
  validate() {
    if (!this.username) {
      this.failed('用户名不能为空')
    }
    if (!this.password) {
      this.failed('密码不能为空')
    } else if (this.password.length < 6) {
      this.failed('密码不得少于6位')
    }
    // sid
    if (!this.sid) {
      this.failed('uuid不能为空')
    }
    // code 验证码
    if (!this.code) {
      this.failed('验证码不能为空')
    }
  }
}



module.exports = {
  RegisterValidator,
  LoginValidator,
}
