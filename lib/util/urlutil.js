var url = require('url')
var dbapi = require('../db/api')

/* eslint guard-for-in:0 */
module.exports.addParams = function(originalUrl, params) {
  var parsed = url.parse(originalUrl, true)
  parsed.search = null
  // TODO: change to ES6 loop
  for (var key in params) {
    parsed.query[key] = params[key]
  }
  return url.format(parsed)
}

module.exports.removeParam = function(originalUrl, param) {
  var parsed = url.parse(originalUrl, true)
  parsed.search = null
  delete parsed.query[param]
  return url.format(parsed)
}

//数据库账号密码登录
module.exports.isLogin = function(name, password, callback) {
  var canLogin = false//可以登录标识
  var email = ''//邮箱
  var index = 0
  //查询用户表信息
  dbapi.findAllUser()
    .then(function(cursor) {
      cursor.each(function(err, data) {
        if(name == data.name && password == data.password) {
          index++
          canLogin = true
          email = data.email
          callback(canLogin, email)
        }else{
          if(cursor._responseIndex==0 && index==0)
            callback(canLogin,email)
        }
    })
  })
}
