module.exports = angular.module('ui-password', [
  require('./login').name,
  require('stf/common-ui/nice-tabs').name
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/password', {
      template: require('./password.pug')
    })
  }])
  .controller('PasswordCtrl', require('./password-controller'))
