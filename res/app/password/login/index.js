require('./login-password.css')
module.exports = angular.module('stf.password.login', [
  require('stf/common-ui').name
])
.run(['$templateCache', function($templateCache) {
  $templateCache.put(
    'password/login/login-password.pug', require('./login-password.pug')
  )
}])
.controller('LoginPasswordCtrl', require('./login-password-controller'))
