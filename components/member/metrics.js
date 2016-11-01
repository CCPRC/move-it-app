var h = require('hyperscript')
var d3 = require('d3')
var topNav = require('./topNav.js')
var buildGraph = function (metric, title) {
  return h('.col-md-6', {
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
            'data-linechartdata': 'lineChartData',
            'data-selectedMetric': metric
          })
        ])
      ])
    ])
}

module.exports = {
  url: '/metrics',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'members', 'stats', '$stateParams', 'optionService', 'assessments', 'fitbit', component]
}

function component ($scope, $state, store, members, stats, $stateParams, optionService, assessments, fitbit) {
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
  }
  // fitbit.authorize().then(function (results) {
  //   console.log(results)
  // })
  $scope.page = 'metrics'
  $scope.statusOptions = optionService.get('status')
  $scope.updateMember = function () {
    members.update($scope.currentMember).then(function (res) {
    })
  }
  $scope.metricOptions = ['armCurl', 'chairTest', 'chairTest1', 'chairTest2', 'diastolic', 'eightFoot1', 'eightFoot2', 'heightFt', 'hipCirc', 'systolic', 'turnLeft', 'turnRight', 'waistCirc', 'weight']
  $scope.lineChartData = []
  $scope.memberAssessments = []
  $scope.displayMetricValues = false
  assessments.get($scope.currentMember._id).then(function (memberAssessments) {
    if (memberAssessments.length === 0) {
      console.log('no assessments')
      $scope.displayMetricValues = true
    } else if (memberAssessments.length === 1) {
      $scope.displayMetricValues = true
      $scope.singleMemberAssessment = memberAssessments[0].doc
      console.log($scope.singleMemberAssessment)
    } else {
      memberAssessments.forEach(function (value, i) {
        if(value.doc.type === 'assessments') {
          $scope.lineChartData.push(value)
        }
      })
    }
  })
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    topNav,
    h('.fixedContainer', [
      h('.col-md-12', [
        h('.site-content', [
          h('div.col-md-12', {
            'data-ng-hide': 'displayMetricValues'
          }, [
            buildGraph("'armCurl'", 'Arm Curl'),
            buildGraph("'diastolic'", 'Diastolic'),
            buildGraph("'systolic'", 'Systolic'),
            buildGraph("'chairTest1'", 'Chair Test 1'),
            buildGraph("'chairTest2'", 'Chair Test 2'),
            buildGraph("'eightFoot1'", 'Eight Foot 1'),
            buildGraph("'eightFoot2'", 'Eight Foot 2'),
            buildGraph("'hipCirc'", 'Hip Circumference'),
            buildGraph("'waistCirc'", 'Waist Circumference'),
            buildGraph("'turnLeft'", 'Turn Left'),
            buildGraph("'turnRight'", 'Turn Right'),
            buildGraph("'weight'", 'Weight'),
          ]),
          h('.col-md-12', {
            'data-ng-show': 'displayMetricValues'
          }, [
            h('h1', {
              'data-ng-hide': 'singleMemberAssessment'
            }, 'No assessments on file'),
            h('h1', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'latest assessment: {{singleMemberAssessment.date | date: medium}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Arm Curl : {{singleMemberAssessment.armCurl}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Diastolic : {{singleMemberAssessment.diastolic}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Sysytolic : {{singleMemberAssessment.systolic}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Chair Test 1 : {{singleMemberAssessment.chairTest1}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Chair Test 2 : {{singleMemberAssessment.chairTest2}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Eight Foot 1 : {{singleMemberAssessment.eightFoot1}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Eight Foot 2 : {{singleMemberAssessment.eightFoot2}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Hip Circumference : {{singleMemberAssessment.hipCirc}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Waist Circumference : {{singleMemberAssessment.waistCirc}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Turn Left : {{singleMemberAssessment.turnLeft}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Turn Right : {{singleMemberAssessment.turnRight}}'),
            h('h3', {
              'data-ng-if': 'singleMemberAssessment'
            }, 'Weight : {{singleMemberAssessment.weight}}')
          ])
        ])
      ])
    ])
  ])
}
