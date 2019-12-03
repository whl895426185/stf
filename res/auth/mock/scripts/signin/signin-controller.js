module.exports = function SignInCtrl($scope, $http, $filter, gettext) {

  $scope.error = null

  $scope.submit = function() {
    var name = $scope.signin.username.$modelValue
    var password = $scope.signin.password.$modelValue

    if(undefined === name) {
      return messageAlert('请输入您的登录账号')
    }
    if(undefined === password) {
      return messageAlert('请输入您的登录密码')
    }

    var data = {name: name, password: password}
    //调用回调函数校验账号密码是否存在
    $http.post('/auth/api/v1/mock', data)
      .success(function(response) {
        if(response.success) {
          if(!response.isLogin) {
            // return messageAlert("Wrong account or password, please contact the system administrator");
            return alert('帐户或密码错误，请与系统管理员联系')
          }
          var data = {name: name, email: response.email, password: password}
          $http.post('/auth/api/v1/mock', data)
            .success(function(response) {
              location.replace(response.redirect)
            })
            .error(function(response) {
            })
        }else{
          return messageAlert('login failer')
        }
      })
      .error(function(response) {
      })

  }

  function messageAlert(msg) {
    alert($filter('translate')(gettext(msg)))
  }
}
