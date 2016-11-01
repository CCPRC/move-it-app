var h = require('hyperscript')
var topNav = require('./topNav.js')
var deviceModal = require('./deviceModal')

module.exports = {
  url: '/devices',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'members', 'notes', 'stats', '$stateParams', 'optionService', 'store', '$uibModal', component]
}

function component ($scope, $state, members, notes, stats, $stateParams, optionService, store, $uibModal) {
  $scope.page = 'devices'
  $scope.statusOptions = optionService.get('status')
  $scope.device1 = []
  $scope.memberDevices = []
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
    //TODO : use service to bring in member devices
    // notes.get($scope.currentMember._id).then(function (memberNotes) {
    //   $scope.memberNotes = memberNotes
    //   console.log('memberNotes', $scope.memberNotes)
    // })
  }
  $scope.addNewDevice = function () {
    console.log($scope.device1)
  }
  $scope.openDeviceModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: deviceModal().outerHTML,
      scope: $scope
    });
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    topNav,
    h('.fixedContainer', [
      h('dv.col-md-12', [
        h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
          'style': 'background-color:#ededed; border: 2px dotted #D3D3D3; display: flex; justify-content: center; padding: 26px;',
          'data-ng-click': 'openDeviceModal()'
        }, [
          h('div', {
            'style': 'cursor:pointer',
            'data-target': '#myModal'
          }, [
            h('h5.inline', ' +'),
            h('h5.inline.medGreyTxt', {
              'style': 'margin-left:10px;'
            }, 'Add Devices')
          ])
        ]),
        h('div.row', {
          'data-ng-repeat': 'device in memberDevices'
        }, [
          h('div.col-md-12', [
            h('div.panel.panel-default', [
              h('div.panel-body', [
                // h('h5', '{{device.name}}'),
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
