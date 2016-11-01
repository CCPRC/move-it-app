var h = require('hyperscript')
var d3 = require('d3')
var buildGraph = function (metric, title, dataPoint) {
  return h('.col-md-6', {
    'data-ng-if': 'linechartdata.length > 0 && linechartdata[0].doc.' + dataPoint
    }, [
      h('.panel.panel-default', {
        'style': 'min-height:105px;'
      }, [
        h('.panel-heading', [
          h('h5', title),
        ]),
        h('.panel-body', [
          h('div', {
            'data-linechart': '',
            'data-linechartdata': 'linechartdata',
            'data-selectedMetric': metric
          })
        ])
      ])
    ])
}

module.exports = {
  url: '/currentReport',
  template: render().outerHTML,
  controller: ['$scope', '$state', '$stateParams', component],
  params: {
    data: null,
    metrics: null
  }
}

function component ($scope, $state, $stateParams) {
  $scope.linechartdata = $stateParams.data
  $scope.groupMetric = $stateParams.metrics
  console.log('linechart', $scope.linechartdata)
  $scope.printThis = function () {
    window.print()
  }
}
function render () {
  return h('div', [
    h('button.col-md-6', {
      'data-ng-click': 'printThis()'
    }, 'PRINT / DOWNLOAD REPORT'),
    h('button.col-md-6', {
      'data-ui-sref': 'reporting'
    }, 'BACK'),
    buildGraph("'armCurl'", 'Arm Curl', 'armCurl'),
    buildGraph("'diastolic'", 'Diastolic', 'diastolic'),
    buildGraph("'systolic'", 'Systolic', 'systolic'),
    buildGraph("'chairTest1'", 'Chair Test 1', 'chairTest1'),
    buildGraph("'chairTest2'", 'Chair Test 2', 'chairTest2'),
    buildGraph("'eightFoot1'", 'Eight Foot 1', 'eightFoot1'),
    buildGraph("'eightFoot2'", 'Eight Foot 2', 'eightFoot2'),
    buildGraph("'hipCirc'", 'Hip Circumference', 'hipCirc'),
    buildGraph("'waistCirc'", 'Waist Circumference', 'waistCirc'),
    buildGraph("'turnLeft'", 'Turn Left', 'turnLeft'),
    buildGraph("'turnRight'", 'Turn Right', 'turnRight'),
    buildGraph("'weight'", 'Weight', 'weight'),
  ])
}
