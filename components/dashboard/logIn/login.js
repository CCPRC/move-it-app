var h = require('hyperscript')

module.exports = {
  url: '/login',
  template: render().outerHTML,
  controller: ['$scope', 'auth', 'store', '$state', 'users', component]
}

function component ($scope, auth, store, $state, users) {
  $scope.userPassword
  $scope.userName
  $scope.view = 'login'
  $scope.popAlert = {
    logIn: false,
    reset: false,
    forgot: false,
    success: false,
    emailTaken: false,
    authId: false
  }
  function popToast (thisElement) {
    $scope.popAlert[thisElement] = true
    setTimeout(function () { fadeAlert(thisElement) }, 5000)
  }
  function onLoginSuccess (profile, token) {
    store.set('profile', profile)
    store.set('token', token)
    getFullUserInfo(profile)
    $scope.loading = false
  }
  function getFullUserInfo (profile) {
    users.getUserByAuthId(profile.user_id).then(function (result) {
      console.log(profile.user_id)
      console.log('this is the auth resultr', result)
      if (result.length === 0) {
        $state.go('newProfile')
      } else {
        store.set('fullProfile', result[0])
        $state.go('dashboard')
      }
    })
  }
  function onCreateSuccess (profile, token) {
    store.set('profile', profile)
    store.set('token', token)
    $state.go('newProfile')
  }
  function onSuccess (type) {
    $scope.view = 'login'
    setTimeout(function () {
      setTimeout(function () { fadeAlert(type) }, 5000)
    }, 1000)
  }
  function onFailed (type) {
    popToast(type)
  }
  function fadeAlert (thisElement) {
    $scope.popAlert[thisElement] = false
    $scope.$apply()
  }
  $scope.changeView = function (thisView) {
    $scope.view = thisView
  }
  $scope.login = function () {
    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.userName,
      password: $scope.userPassword
    }, onLoginSuccess, onFailed('logIn'))
  }
  $scope.resetPass = function () {
    auth.reset({
      popup: true,
      connection: 'Username-Password-Authentication',
      username: $scope.userName
    }, onSuccess('reset'), onFailed('forgot'))
  }
  $scope.createLogin = function () {
    auth.signup({
      connection: 'Username-Password-Authentication',
      username: $scope.userName,
      password: $scope.userPassword
    }, onCreateSuccess, onFailed('emailTaken'))
  }
}

function render () {
  return h('.fullPageContainer', {
    'style': 'background-color: #282E35;position:fixed;height:100vh;width:100%;'
  }, [
    h('.centeredContainer.col-sm-4.col-sm-offset-4.col-md-6.col-md-offset-3', [
      h('.login-content', [
        h('div', [
          h('img.loginLogo', {
            'src': 'img/ccprc_logo.svg',
            'data-ng-click': "changeView('login')"
          })
        ]),
        h('.loginForm', [
          h('form.loginFormInner', [
            h('p', 'EMAIL ADDRESS'),
            h('input.loginInput', {
              'type': 'text',
              'data-ng-model': 'userName'
            }),
            h('p', {
              'data-ng-if': "view === 'login' || view === 'create'"
            }, 'PASSWORD'),
            h('input.loginInput', {
              'type': 'password',
              'data-ng-model': 'userPassword',
              'data-ng-show': "view === 'login' || view === 'create'"
            }),
            h('div', [
              h('.btn.loginbutton', {
                'data-ng-click': 'login()',
                'data-ng-if': "view === 'login'"
              }, 'Sign In'),
              h('.btn.loginbutton', {
                'data-ng-click': 'resetPass()',
                'data-ng-if': "view === 'reset'"
              }, 'Reset password'),
              h('.btn.loginbutton', {
                'data-ng-click': 'createLogin()',
                'data-ng-if': "view === 'create'"
              }, 'Create Account')
            ]),
            h('.greyLine', {
              'data-ng-if': "view === 'login'"
            }),
            h('a', {
              'data-ng-click': "changeView('reset')",
              'data-ng-if': "view === 'login'"
            }, 'Forgot Password?'),
            h('a', {
              'data-ng-click': "changeView('create')",
              'data-ng-if': "view === 'login'",
              'id': 'createAccountLink',
            }, 'Create Account'),
            h('a', {
              'data-ng-click': "changeView('login')",
              'data-ng-if': "view === 'reset' || view === 'create'",
              'id': 'loginBackLink'
            }, 'Back')
          ])
        ])
      ])
    ]),
    h('.resetAlert .authAlert', {
      'data-ng-if': "popAlert['reset']"
    }, 'An email has been sent to {{userName}} with instructions to reset your password'),
    h('.forgotErrorAlert .authAlert', {
      'data-ng-if': "popAlert['forgot']"
    }, 'Email not recognized'),
    h('.loginErrorAlert .authAlert', {
      'data-ng-if': "popAlert['login']"
    }, 'Email or/and password not recognized'),
    h('.createSuccessAlert .authAlert', {
      'data-ng-if': "popAlert['success']"
    }, 'Successfully created login for {{userName}}'),
    h('.createFailureAlert .authAlert', {
      'data-ng-if': "popAlert['emailTaken']"
    }, 'Email already taken'),
    h('.authIdAlert .authAlert', {
      'data-ng-if': "popAlert['authId']"
    }, 'user already exists with auth0 id')
  ])
}
