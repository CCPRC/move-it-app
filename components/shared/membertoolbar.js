var h = require('hyperscript')

module.exports = function () {
  return {
    template: template().outerHTML,
    controller: ['$scope', 'auth', '$state', 'members', '$stateParams', 'store', controller],
    scope: {
      page: '@currentpage'
    }
  }
}

function controller ($scope, auth, $state, members, $stateParams, store) {
  $scope.toggleDropdown = {
    show: false
  }
  $scope.currentUser = store.get('fullProfile')
  $scope.logout = function () {
    auth.signout()
    store.remove('profile')
    store.remove('token')
    $state.go('login')
  }
}

function template () {
  return h('.moveItLeftNav', [
    h('.topLeft', [
      h('img.ccprcMenuLogo', {
        'src': 'img/ccprc_logo.svg'
      }),
      h('div.line')
    ]),
    h('div.midLeft', [
      h('.toggle.userMenuClick', {
        'style':'cursor: pointer',
        'data-ng-click': "toggleDropdown = !toggleDropdown"
      }, [
        h('img.navUserAvatar', {
          'data-ng-src': "{{currentUser.avatar || 'img/images.png'}}"
          // 'data-ng-click': "toggleDropdown = !toggleDropdown"
        }),
        // h('p', {
        //   'style':'display:inline-block'
        // }, '{{user.email}}'),
        h('i.glyphicon.glyphicon-triangle-bottom', {
          // 'data-ng-click': "toggleDropdown = !toggleDropdown"
        }),
        h('.dropdown', {
          'data-ng-show': "!toggleDropdown",
          'style':'display:block',
        }, [
          h('li', {
            'style':'cursor: pointer',
            'data-ui-sref': 'userProfile'
          }, 'Edit Profile'),
          h('li', {
            'style':'cursor: pointer',
          }, 'Preferences'),
          h('li', {
            'style':'cursor: pointer',
            'data-ng-click': 'logout()'
          }, 'Sign Out')
        ]),
      ]),
    ]),
      h('div.line', {'style':'margin-left:0; margin-right:0;'}),
    h('.siteLinks', [
      h('.dashRow', {
        'data-ui-sref': 'dashboard',
        'data-ng-class': "page === 'dashboard' ? 'dashRowActive' : 'notSelected'"
      }, [
        h('.centerThis', [
          h('a', {
            'data-ui-sref': 'dashboard'
          }, [
            h('img.marginRight.imgSize', {
              'src': 'img/eyeIcon.svg'
            })
          ], 'Dashboard')
        ])
      ]),
      h('.dashRow', {
        'data-ui-sref': 'all',
        'data-ng-class': "page === 'people' ? 'dashRowActive' : 'notSelected'"
      }, [
        h('.centerThis', [
          h('a', {
            'data-ui-sref': 'all',
            'data-ng-click': "page = 'all'"
          }, [
            h('img.marginRight', {
              'src': 'img/peopleIcon.svg'
            })
          ], 'People')
        ])
      ]),
      h('.dashRow', {
        'data-ui-sref': 'groups',
        'data-ng-class': "page === 'groups' ? 'dashRowActive' : 'notSelected'"
      }, [
        h('.centerThis', [
          h('a', { 'data-ui-sref': 'groups' }, [
            h('img.marginRight.imgSize', {'src': 'img/groupsIcon.svg'})
          ], 'Groups')
        ])
      ]),
      h('.dashRow', {
        'data-ui-sref': 'classes',
        'data-ng-class': "page === 'classes' ? 'dashRowActive' : 'notSelected'"
      }, [
        h('.centerThis', [
          h('a', { 'data-ui-sref': 'classes' }, [
            h('img.marginRight.imgSize', {'src': 'img/flameIcon.svg'})
          ], 'Classes')
        ])
      ]),
      h('.dashRow', {
        'data-ui-sref': 'reporting',
        'data-ng-class': "page === 'reporting' ? 'dashRowActive' : 'notSelected'"
      }, [
        h('.centerThis', [
          h('a', { 'data-ui-sref': 'reporting' }, [
            h('img.marginRight.imgSize', {'src': 'img/barIcon.svg'})
          ], 'Reporting')
        ])
      ])
    ]),
    h('a.support', {
      'href': 'https://moveitus.zendesk.com/hc/en-us'
    }, 'Support')
  ])
}
