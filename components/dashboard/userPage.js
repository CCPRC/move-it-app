var h = require('hyperscript')

module.exports = {
  url: '/userPage/:member_id',
  template: render().outerHTML,
  controller: ['$scope', 'members', 'stats', '$stateParams', component]
}

function component ($scope, members, stats, $stateParams) {
  stats.get('363409ecdc9e546b4096054654186ee7').then(function (memberStats) {})
  $scope.currentMember = store.get('currentMember')
  $scope.member_id = $stateParams.member_id
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    h('.container', [
      h('h1', '{{member.firstName}}'),
      h('.col-xs-9.col-sm-9.col-md-10.col-md-offset-2.main.containertop', [
        h('.site-content', [
          h('h1', 'This is a User view!'),
          h('h5', '{{currentMember.firstName}} {{currentMember.lastName}}')
        ])
      ])
    ])
  ])
}
