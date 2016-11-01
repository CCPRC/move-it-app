var h = require('hyperscript')
var peopleAddNav = require('../peopleAddNav.js')

module.exports = {
  url: '/newuser',
  template: render().outerHTML,
  controller: ['$scope', 'users', 'uploadSvc', component]
}

function component ($scope, users, uploadSvc) {
  users.list().then(function (allNavigators) {
    $scope.allNavigators = allNavigators
  })
  $scope.file
  $scope.showPeople = 'users'
  $scope.addNewNavigator = function () {
    var newNavigator = {}
    newNavigator = {
      'firstName': $scope.user.firstName,
      'lastName': $scope.user.lastName,
      'class': $scope.user.class,
      'organization': $scope.user.organization,
      'avatar': '',
      'directPhone': $scope.user.directPhone,
      'directEmail': $scope.user.directEmail,
      'directAddress': $scope.user.directAddress,
      'directCity': $scope.user.directCity,
      'directState': $scope.user.directState,
      'directZipcode': $scope.user.directZipcode,
      'organizationAddress': $scope.user.organizationAddress,
      'organizationCity': $scope.user.organizationCity,
      'organizationState': $scope.user.organizationState,
      'organizationZipcode': $scope.user.organizationZipcode,
      'organizationEmail': $scope.user.organizationEmail,
      'organizationPhone': $scope.user.organizationPhone,
      'organizationFax': $scope.user.organizationFax

    }
    users.create(newNavigator).then(function (res) {
      uploadSvc.uploadAvatar($scope.file, res.id)
      currentNavigatorService.currentNavigator = res
      $state.go('all')
    })
    $scope.uploadFiles = function(file, errFiles) {
      $scope.file = file
      console.log(file)
      $scope.errFile = errFiles && errFiles[0]
    }
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    peopleAddNav,
    h('.fixedContainerShort', [
      h('.col-md-6', [
        h('.panel.panel-default', [
          h('.panel-heading', [
            h('h5', 'General'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'FIRST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.firstName',
                'required': ''
              })
            ]),
            h('div.col-md-6', [
              h('p.formP', 'LAST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'CLASS'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.class',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGANIZATION'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organization',
                'required': ''
              })
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img.preview', {
                'data-ngf-src': "user.avatar",
                'style': 'float:left; width:25%; margin: 5px 5px 0px 0px; border-radius:100%;height:30px;width:30px;'
              }),
              h('input', {
                'id': 'userAvatar',
                'type': 'file',
                'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
                'data-ngf-max-size':'2MB',
                'data-accept': 'image/*',
                'data-ng-model': 'user.avatar'
              })
            ]),
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', [
          h('.panel-heading', [
            h('h5', 'Contact')
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'DIRECT PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.directPhone',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'DIRECT EMAIL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.directEmail',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'DIRECT ADDRESS'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.directAddress',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'CITY'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.city',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'STATE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.state',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ZIP CODE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.zipcode',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGANIZATION ADDRESS'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organizationAddress',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'CITY'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.city',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGANIZATION STATE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organizationState',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGNIZATION ZIPCODE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organizationZipcode',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGANIZATION EMAIL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organizationEmail',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGNIZATION PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organizationPhone',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'ORGNIZATION FAX'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'user.organizationFax',
                'required': ''
              })
            ])
          ])
        ])
      ]),
      h('.right.col-md-6', [
        h('br'),
        h('button.btn.btn-info', {
          'data-ng-click': 'addNewNavigator()',
          'style': 'width:140px; padding:10px'
        }, 'Add Navigator'),
        h('button.btn.btn-danger', {
          'data-ui-sref': 'all',
          'style': 'margin-left:20px;width:140px; padding:10px'
        }, 'Cancel')
      ])
    ])
  ])
}
