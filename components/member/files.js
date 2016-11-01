var h = require('hyperscript')
var topNav = require('./topNav.js')

module.exports = {
  url: '/files',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'members', 'stats', '$stateParams', 'uploadSvc', 'optionService', component]
}

function component ($scope, $state, store, members, stats, $stateParams, uploadSvc, optionService) {
  $scope.page = 'files'
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
  }
  $scope.statusOptions = optionService.get('status')
  $scope.file
  $scope.uploadFiles = function(file, errFiles) {
    console.log(file)
    $scope.file = file
    $scope.errFile = errFiles && errFiles[0]
    uploadSvc.upload($scope.file, $scope.currentMember._id)
    $state.reload()
  }
  $scope.updateMember = function () {
    members.update($scope.currentMember).then(function (res) {
    })
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    topNav,
    h('.fixedContainer', [
      h('div.col-md-12', [
        h('.col-md-12', [
          h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
            'style': 'border: 2px dotted rgb(211, 211, 211); display: flex; align-items: center; justify-content: center; padding: 35px; background-color: rgb(237, 237, 237);'
          }, [
            h('a', {
              'id': 'fileUploadInput',
              'type': 'file',
              'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
              'data-ngf-max-size':'2MB',
              'data-accept': 'image/*'
            }, [
              h('h5.inline', ' +'),
              h('h5.inline.medGreyTxt', {
                'style': 'margin-left:10px;'
              }, 'Add New File')
            ])
          ])
        ]),
        h('div.col-md-4', [
          h('div.movePanel.shadowHover', [
            h('div', [
              h('div', [
                h('p.ref', {
                  'style': 'display:inline-block;'
                }, 'tips_and_tricks.pdf'),
                h('img.fileIcon', {
                  'src': 'img/pdf_icon.png',
                  'style': 'display:inline-block;'
                })
              ]),
              h('span.createdBy', '45mb')
            ])
          ])
        ])
      ])
    ])
  ])
}
