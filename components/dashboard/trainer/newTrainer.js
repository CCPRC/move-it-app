var h = require('hyperscript')
var peopleAddNav = require('../peopleAddNav.js')

module.exports = {
  url: '/newtrainer',
  template: render().outerHTML,
  controller: ['$scope', 'trainers', 'uploadSvc', component]
}

function component ($scope, trainers, uploadSvc) {
  $scope.setCurrentTrainer = function (trainer) {
    currentTrainerService.currentTrainer = trainer
  }
  $scope.file
  $scope.showPeople = 'trainers'
  $scope.addNewTrainer = function () {
    var newTrainer = {}
    newTrainer = {
      'firstName': $scope.trainer.firstName,
      'lastName': $scope.trainer.lastName,
      'email': $scope.trainer.email,
      'group/hospital': $scope.physician.hospital,
      'officeManager': $scope.physician.officeManager,
      'type': 'trainer',
      'directEmail': $scope.physician.directEmail,
      'officeFax': $scope.physician.officeFax,
      'avatar': ''
    }
    trainers.create(newTrainer).then(function (res) {
      uploadSvc.uploadAvatar($scope.file, res.id)
      currentTrainerService.currentTrainer = res
      $state.go('all')
    })
  }
  trainers.list().then(function (allTrainers) {
    $scope.allTrainers = allTrainers
  })
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
            h('h5', 'Contact Information'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'FIRST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'trainer.firstName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'LAST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'trainer.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'GROUP/HOSPITAL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'trainer.groupHospital',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'OFFICE MANAGER'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'trainer.officeManager',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'PHONE NUMBER'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'trainer.phoneNumber',
                'required': ''
              })
            ]),
            h('div.col-md-6', [
              h('p.formP', 'FAX NUMBER'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'trainer.faxNumber',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'EMAIL'),
              h('input.form-control', {
                'type': 'email',
                'data-ng-model': 'trainer.email',
                'required': ''
              })
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img.preview', {
                'data-ngf-src': "trainer.avatar",
                'style': 'float:left; width:25%; margin: 5px 5px 0px 0px; border-radius:100%;height:30px;width:30px;'
              }),
              h('input', {
                'id': 'userAvatar',
                'type': 'file',
                'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
                'data-ngf-max-size':'2MB',
                'data-accept': 'image/*',
                'data-ng-model': 'trainer.avatar'
              })
            ]),
          ])
        ]),
      ]),
      h('.right.col-md-6', [
        h('br'),
        h('button.btn.btn-info', {
          'data-ng-click': 'addNewTrainer()',
          'style': 'width:140px; padding:10px'
        }, 'Add Trainer'),
        h('button.btn.btn-danger', {
          'data-ui-sref': 'all',
          'style': 'margin-left:20px;width:140px; padding:10px'
        }, 'Cancel')
      ])
    ])
  ])
}
