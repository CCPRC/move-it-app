var h = require('hyperscript')
var peopleAddNav = require('../peopleAddNav.js')

module.exports = {
  url: '/newphysician',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'physicians', 'optionService', 'uploadSvc', component]
}

function component ($scope, $state, physicians, optionService, uploadSvc) {
  $scope.hospitals = optionService.get('hospitals')
  $scope.states = optionService.get('states')
  $scope.showModal = {
    addHospital: false
  }
  $scope.showPeople = 'physicians'
  $scope.file
  $scope.addNewHospital = function () {
    $scope.hospitals.push($scope.physician.hospital)
  }
  $scope.addNewPhysician = function () {
    var newPhysician = {}
    newPhysician = {
      'firstName': $scope.physician.firstName,
      'lastName': $scope.physician.lastName,
      'group/hospital': $scope.physician.hospital,
      'officeManager': $scope.physician.officeManager,
      'type': 'physician',
      'directEmail': $scope.physician.directEmail,
      'officeAddress': $scope.physician.officeAddress,
      'city': $scope.physician.city,
      'state': $scope.physician.state,
      'zipcode': $scope.physician.zipcode,
      'officePhone': $scope.physician.officePhone,
      'directPhone': $scope.physician.directPhone,
      'officeFax': $scope.physician.officeFax,
      'officeEmail': $scope.physician.officeEmail,
      'avatar': ''
    }
    physicians.create(newPhysician).then(function (res) {
      uploadSvc.uploadAvatar($scope.file, res.id)
      currentPhysicianService.currentPhysician = res
      $state.go('all')
    })
  }
  $scope.uploadFiles = function(file, errFiles) {
    $scope.file = file
    console.log(file)
    $scope.errFile = errFiles && errFiles[0]
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
        h('.panel.panel-default', {
          'style':'padding-bottom:10px;'
        },[
          h('.panel-heading', [
            h('h5', 'General'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'FIRST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.firstName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'LAST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'HOSPITAL / GROUP'),
              h('select#sel1.form-control', {
                'data-ng-model': 'physician.hospital',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'hospital in hospitals'
                }, '{{hospital}}')
              ])
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img.preview', {
                'data-ngf-src': "physician.avatar",
                'style': 'float:left; width:25%; margin: 5px 5px 0px 0px; border-radius:100%;height:30px;width:30px;'
              }),
              h('input', {
                'id': 'userAvatar',
                'type': 'file',
                'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
                'data-ngf-max-size':'2MB',
                'data-accept': 'image/*',
                'data-ng-model': 'physician.avatar'
              })
            ]),
          ])
        ])
      ]),
      h('.col-md-6',  [
        h('.panel.panel-default', {
          'style':'padding-bottom:10px;'
        }, [
          h('.panel-heading', [
            h('h5', 'Contact'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'DIRECT PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.directPhone',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'DIRECT EMAIL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.directEmail',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'OFFICE ADDRESS'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.officeAddress',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'CITY'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.city',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'STATE'),
              h('select#sel1.form-control', {
                'data-ng-model': 'physician.state',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'stateVal in states'
                }, '{{stateVal}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'ZIPCODE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.zipcode',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'OFFICE EMAIL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.officeEmail',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'OFFICE PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.officePhone',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'OFFICE FAX'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'physician.officeFax',
                'required': ''
              })
            ])
          ])
        ])
      ]),
      h('.right.col-md-6', [
        h('br'),
        h('button.btn.btn-info', {
          'data-ng-click': 'addNewPhysician()',
          'style': 'width:140px; padding:10px'
        }, 'Add Physician'),
        h('button.btn.btn-danger', {
          'data-ui-sref': 'all',
          'style': 'margin-left:20px;width:140px; padding:10px'
        }, 'Cancel')
      ])

    ])
  ])
}
