module.exports =
  function LoginPasswordCtrl($scope, $http, UserService, $location, gettext, $filter) {

  $scope.submit = function() {
    var oldPassword = $scope.userinfo.oldPassword.$modelValue
    var newPassword = $scope.userinfo.newPassword.$modelValue
    var confirmPassword = $scope.userinfo.confirmPassword.$modelValue

    if(undefined === oldPassword || undefined === newPassword || undefined === confirmPassword) {
      return
    }
    if(newPassword.length > 12 || newPassword.length < 6
      || confirmPassword.length > 12 || confirmPassword.length < 6) {
      return
    }
    if(newPassword !== confirmPassword) {
      return messageAlert('The new login password entered twice is inconsistent, please re-enter')
    }

    $scope.currentUser = UserService.currentUser

    var data = {
      userName: $scope.currentUser.name,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    $http.post('/api/v1/user/update', data)
      .success(function(response) {
        if (!response.success) {
          return alert(gettext('Password modification failed'))
        }
        if(response.status === 'USER_NULL') {
          return messageAlert('User does not exist, unable to change login password')
        }else if(response.status === 'USER_PASSWORD_ERR') {
          return messageAlert('The old login password entered is incorrect. Please re-enter it')
        }else{
          messageAlert('Password modified successfully')
          return $location.path('/devices')
        }
      })
  }

  function messageAlert(msg) {
    alert($filter('translate')(gettext(msg)))
  }
}
