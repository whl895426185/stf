module.exports = function PasswordCtrl($scope, gettext) {

  $scope.passwordTabs = [
    {
      title: gettext('Change Login Password'),
      icon: 'fa-key fa-fw',
      templateUrl: 'password/login/login-password.pug'
    }
  ]
}
