var h = require('hyperscript')
module.exports = {
  url: '/newprofile',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'users', 'store', 'optionService', component]
}
function component ($scope, $state, users, store, optionService) {
  $scope.currentUser = store.get('profile')
  users.list().then(function (allUserData) {
    $scope.allUserData = allUserData
  })
  $scope.states = optionService.get('states')
  $scope.classifications = ['Navigator', 'Participant', 'Physician', 'Trainer']
  var profile = store.get('profile')
  $scope.addNewUserData = function (user) {
    var newUserData = {}
    newUserData = {
      'firstName': $scope.userFirstName,
      'lastName': $scope.userLastName,
      'classification': $scope.classification,
      'organization': $scope.organization,
      'phone': $scope.directPhone,
      'email': $scope.directEmail,
      'address': $scope.directAddress,
      'city': $scope.city,
      'state': $scope.state,
      'zipCode': $scope.zipCode,
      'organizationAddress': $scope.organizationAddress,
      'organizationcity': $scope.organizationcity,
      'organizationState': $scope.organizationState,
      'organizationZipCode': $scope.organizationZipCode,
      'organizationEmail': $scope.organizationEmail,
      'organizationPhone': $scope.organizationPhone,
      'organizationFax': $scope.organizationFax,
      'administrator': $scope.administrator,
      'auth_id': profile.user_id
    }
    users.create(newUserData).then(function (res) {
      if(res.ok) {
        newUserData._id = res.id
        store.set('fullProfile', newUserData)
        $state.go('dashboard')
      }
    })
  }
}
function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'newProfile'
    }),
    h('.topToolBar', [
      h('img', {
        'src': 'img/bolt.svg',
        'id': 'boltIcon'
      }),
      h('.toptext', 'Welcome to Locom, {{currentUser.nickname | capitalize }}'),
      h('.topTools', [
        h('img.searchIcon', {
          'src': 'img/search.svg'
        })
      ])
    ]),
    h('.fixedContainerShort', [
      h('.dataBody', [
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', 'General'),
            h('.panel-body', [
              h('.col-md-6', [
                h('p.formP', 'FIRST NAME'),
                h('input.form-control#userFirstName', {
                  'type': 'text',
                  'data-ng-model': 'userFirstName',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'LAST NAME'),
                h('input.form-control#userLastName', {
                  'type': 'text',
                  'data-ng-model': 'userLastName',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'CLASSIFICATION'),
                h('select.form-control', {
                  'type': 'text',
                  'data-ng-model': 'classification',
                  'required': ''
                }, [
                  h('option.form-control', {
                    'data-ng-repeat': 'classification in classifications'
                  }, '{{classification}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION'),
                h('select.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organization',
                  'required': ''
                }, [
                  h('option.form-control', {
                    'name':'roper'
                  }, 'Roper St. Francis'),
                  h('option.form-control', {
                    'name':'CCPRC'
                  }, 'CCPRC'),
                ])
              ])
              // h('createCheck.fa.fa-check', {
              //   'data-ng-click': 'addNewUserData()'
              // })
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', 'Contact'),
            h('.panel-body', [
              h('.col-md-6', [
                h('p.formP', 'DIRECT PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'directPhone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'directEmail',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'directAddress',
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'city',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'STATE'),
                h('select.form-control', {
                  'type': 'text',
                  'data-ng-model': 'state',
                  'required': ''
                }, [
                  h('option.form-control', {
                    'data-ng-repeat': 'stateVal in states'
                  }, '{{stateVal}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'ZIP CODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'zipCode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationAddress',
                  // 'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationcity',
                  // 'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION STATE'),
                h('select.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationState',
                  // 'required': ''
                }, [
                  h('option.form-control', {
                    'data-ng-repeat': 'stateVal in states'
                  }, '{{stateVal}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION ZIP CODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationZipCode',
                  // 'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationEmail',
                  // 'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationPhone',
                  // 'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION FAX'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'organizationFax',
                  // 'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ADMINISTRATOR'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'administrator',
                  // 'required': ''
                })
              ])
            ])
          ]),
          h('.lincBtn', {
            'data-ng-click': 'addNewUserData()',
            'style':'width:100px;'
          }, 'Save')
        ])
      ])
    ])
  ])
}
