var h = require('hyperscript')
var topTools = require('../shared/topTools.js')
var individualReporting = require('./individualReporting')
var groupReporting = require('./groupReporting')
var d3 = require('d3')
var buildGraph = function (metric, title) {
  return h('.col-md-6', {
    'data-ng-if': 'linechartdata.length > 0 && groupMetric[' + metric + ']'
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
  url: '/reporting',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'reports', 'FileSaver', 'Blob', 'members', 'groups', 'optionService', 'assessments', '$q', component]
}

function component ($scope, $state, store, reports, FileSaver, Blob, members, groups, optionService, assessments, $q) {
  $scope.view = 'home'
  groups.list().then(function (allGroups) {
    $scope.allGroups = allGroups
  })
  $scope.individualReport = {
    'reportName': '',
    'participant': {},
    'metric': '',
    'startDate': '',
    'endDate': '',
    'assessments': {},
    'createdBy': ''
  }
  $scope.groupReport = {
    'reportName': '',
    'metric': '',
    'startDate': '',
    'endDate': '',
    'linechartdata': {},
    'group': [],
    'createdBy': ''
  }
  $scope.groupMetric = {
    'all': true,
    'chairTest1': false,
    'chairTest2': false,
    'sixMinWalk': false,
    'eightFoot1': false,
    'eightFoot2': false,
    'turnRight': false,
    'turnLeft': false,
    'armCurl': false,
    'heightFt': false,
    'heightIn': false,
    'weight': false,
    'diastolic': false,
    'systolic': false
  }
  $scope.selectMetric = function (metric) {
      if (metric === 'armCurl') {
        $scope.groupMetric.armCurl = !$scope.groupMetric.armCurl
      }
      if (metric === 'chairTest') {
        $scope.groupMetric.chairTest1 = !$scope.groupMetric.chairTest1
        $scope.groupMetric.chairTest2 = !$scope.groupMetric.chairTest2
      }
      if (metric === 'sixMinWalk') {
        $scope.groupMetric.sixMinWalk = !$scope.groupMetric.sixMinWalk
      }
      if (metric === 'eightFoot') {
        $scope.groupMetric.eightFoot1 = !$scope.groupMetric.eightFoot1
        $scope.groupMetric.eightFoot2 = !$scope.groupMetric.eightFoot2
      }
      if (metric === 'turns') {
        $scope.groupMetric.turnRight = !$scope.groupMetric.turnRight
        $scope.groupMetric.turnLeft = !$scope.groupMetric.turnLeft      }
      if (metric === 'weight') {
        $scope.groupMetric.weight = !$scope.groupMetric.weight
      }
      if (metric === 'systolic') {
        $scope.groupMetric.systolic = !$scope.groupMetric.systolic
      }
      if (metric === 'diastolic') {
        $scope.groupMetric.diastolic = !$scope.groupMetric.diastolic
      }
     $scope.groupMetric.all = false
      if ($scope.groupMetric.armCurl === false && $scope.groupMetric.chairTest1 === false && $scope.groupMetric.sixMinWalk === false && $scope.groupMetric.eightFoot1 === false && $scope.groupMetric.turnRight === false && $scope.groupMetric.weight === false && $scope.groupMetric.systolic === false && $scope.groupMetric.diastolic) {
        $scope.groupMetric.all = true
      }
    }
  $scope.linechartdata = []
  $scope.currentGroupAssessments = [
    {
      'location': 'nowhere',
      'class': 'fitness1',
      'time': '2016-05-16T07:00:00.000Z',
      'trainer': 'Steve',
      'chairTest1': 23,
      'chairTest2': 24,
      'sixMinWalk': 24,
      'eightFoot1': 22,
      'eightFoot2': 22,
      'turnRight': 10,
      'turnLeft': 10,
      'armCurl': 10,
      'heightFt': 5,
      'heightIn': 5,
      'weight': 150,
      'diastolic': 100,
      'systolic': 100,
      'waistCirc': 30,
      'hipCirc': 30,
      'date': '2016-05-16T07:00:00.000Z',
      'type': 'assessment',
      'parent_id': 100
    },
    {
      'location': 'nowhere',
      'class': 'fitness2',
      'time': '2016-05-17T07:00:00.000Z',
      'trainer': 'Steve',
      'chairTest1': 24,
      'chairTest2': 25,
      'sixMinWalk': 25,
      'eightFoot1': 23,
      'eightFoot2': 23,
      'turnRight': 11,
      'turnLeft': 11,
      'armCurl': 11,
      'heightFt': 6,
      'heightIn': 6,
      'weight': 150,
      'diastolic': 99,
      'systolic': 99,
      'waistCirc': 30,
      'hipCirc': 31,
      'date': '2016-05-17T07:00:00.000Z',
      'type': 'assessment',
      'parent_id': 101
    },
    {
      'location': 'nowhere',
      'class': 'fitness3',
      'time': '2016-05-18T07:00:00.000Z',
      'trainer': 'Steve',
      'chairTest1': 25,
      'chairTest2': 26,
      'sixMinWalk': 26,
      'eightFoot1': 24,
      'eightFoot2': 24,
      'turnRight': 9,
      'turnLeft': 9,
      'armCurl': 12,
      'heightFt': 6,
      'heightIn': 6,
      'weight': 150,
      'diastolic': 97,
      'systolic': 97,
      'waistCirc': 29,
      'hipCirc': 30,
      'date': '2016-05-18T07:00:00.000Z',
      'type': 'assessment',
      'parent_id': 102
    },
    {
      'location': 'nowhere',
      'class': 'fitness3',
      'time': '2016-05-18T07:00:00.000Z',
      'trainer': 'Steve',
      'chairTest1': 26,
      'chairTest2': 27,
      'sixMinWalk': 28,
      'eightFoot1': 24,
      'eightFoot2': 24,
      'turnRight': 8,
      'turnLeft': 8,
      'armCurl': 17,
      'heightFt': 6,
      'heightIn': 6,
      'weight': 150,
      'diastolic': 97,
      'systolic': 97,
      'waistCirc': 29,
      'hipCirc': 30,
      'date': '2016-05-18T07:00:00.000Z',
      'type': 'assessment',
      'parent_id': 102
    },
  ]
  $scope.currentDate = new Date()
  $scope.currentGroup = []
  $scope.metricOptions = ['armCurl', 'chairTest', 'chairTest1', 'chairTest2', 'diastolic', 'eightFoot1', 'eightFoot2', 'heightFt', 'hipCirc', 'systolic', 'turnLeft', 'turnRight', 'waistCirc', 'weight']
  $scope.currentUser = store.get('fullProfile')
  $scope.ethnicities = optionService.get('ethnicities')
  $scope.hospitals = optionService.get('hospitals')
  $scope.statuses = optionService.get('statuses')
  $scope.physicians = optionService.get('physicians')
  members.list().then(function (allMembers) {
    $scope.individuals = allMembers
  })
  reports.list().then(function (allReports) {
    $scope.allReports = allReports
    console.log(allReports)
  })
  $scope.setCurrentReport = function (report) {
    currentReportService.currentReport = report
  }
  $scope.exportData = function () {
    var blob = new
    Blob([document.getElementById('allCards').innerHTML], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    })
    FileSaver.saveAs(blob, 'Report.xls')
  }
  $scope.addNewReport = function (report) {
    var newReport = {}
    if($scope.currentUser && $scope.currentUser.firstName && $scope.currentUser.lastName) {
      newReport = {
        'reportName': $scope.reportName,
        'createdBy': $scope.currentUser.firstName + ' ' + $scope.currentUser.lastName,
        'data': $scope.linechartdata,
        'date': $scope.currentDate
      }
    } else {
      newReport = {
        'reportName': $scope.reportName,
        'createdBy': 'NA',
        'data': $scope.linechartdata,
        'date': $scope.currentDate
      }
    }
    reports.create(newReport).then(function (res) {
      $state.reload()
    })
  }
  var assessmentSnapShot
  var simpleDateAssessment
  var simpleDateSnapShot
  var groupAssessments = $scope.currentGroupAssessments
  var metricsToCheck = ['armCurl', 'chairTest', 'chairTest1', 'chairTest2', 'diastolic', 'eightFoot1', 'eightFoot2', 'hipCirc', 'systolic', 'turnLeft', 'turnRight', 'waistCirc', 'weight']
  function formatWorkingMetric (assessmentSnapShot) {
    var formattedAssessment = {
      'doc': {
        'chairTest': assessmentSnapShot.chairTest.value,
        'chairTest1': assessmentSnapShot.chairTest1.value,
        'chairTest2': assessmentSnapShot.chairTest2.value,
        'sixMinWalk': assessmentSnapShot.sixMinWalk.value,
        'eightFoot1': assessmentSnapShot.eightFoot1.value,
        'eightFoot2': assessmentSnapShot.eightFoot2.value,
        'turnRight': assessmentSnapShot.turnRight.value,
        'turnLeft': assessmentSnapShot.turnLeft.value,
        'armCurl': assessmentSnapShot.armCurl.value,
        'weight': assessmentSnapShot.weight.value,
        'diastolic': assessmentSnapShot.diastolic.value,
        'systolic': assessmentSnapShot.systolic.value,
        'waistCirc': assessmentSnapShot.waistCirc.value,
        'hipCirc': assessmentSnapShot.hipCirc.value,
        'date': assessmentSnapShot.date,
      }
    }
    if(simpleDateAssessment === simpleDateSnapShot) {
      $scope.linechartdata.splice(-1, 1)
      $scope.linechartdata.push(formattedAssessment)
    } else {
      $scope.linechartdata.push(formattedAssessment)
    }
    console.log($scope.linechartdata)
    groupAssessments.splice(0, 1)
    setTimeout(function(){
      averageReport(assessmentSnapShot)
    })
  }
  function fillExistingMetrics (assessment, metric) {
    if(assessment[metric]) {
      assessmentSnapShot[metric].value = (assessmentSnapShot[metric].value + assessment[metric]) / assessmentSnapShot[metric].occurances
      assessmentSnapShot[metric].occurances ++
    }
  }
  function generateMetrics (assessment) {
    assessmentSnapShot = workingAssessment
    var deferred = $q.defer();
    angular.forEach(metricsToCheck, function (metric) {
      fillExistingMetrics(assessment, metric, assessmentSnapShot)
    })
    simpleDateAssessment = assessment.date.split('T')[0]
    simpleDateSnapShot = assessmentSnapShot.date.split('T')[0]
    if(assessment.date) {
      assessmentSnapShot.date = assessment.date
    }
    deferred.resolve(assessmentSnapShot);
    return deferred.promise;
  }
  function callFirstAssessment (passedAssessments) {
    var assessment = passedAssessments[0]
    generateMetrics(assessment).then(function(assessmentSnapShot){
      formatWorkingMetric(assessmentSnapShot)
    })
  }
  var workingAssessment
  function averageReport (snapShot) {
    if(snapShot) {
      workingAssessment = snapShot
      if(groupAssessments.length > 0) {
        callFirstAssessment(groupAssessments)
      }
    } else {
      workingAssessment = {
          'chairTest': {
            'value': 0,
            'occurances': 1
          },
          'chairTest1': {
            'value': 0,
            'occurances': 1
          },
          'chairTest2': {
            'value': 0,
            'occurances': 1
          },
          'sixMinWalk': {
            'value': 0,
            'occurances': 1
          },
          'eightFoot1': {
            'value': 0,
            'occurances': 1
          },
          'eightFoot2': {
            'value': 0,
            'occurances': 1
          },
          'turnRight': {
            'value': 0,
            'occurances': 1
          },
          'turnLeft': {
            'value': 0,
            'occurances': 1
          },
          'armCurl': {
            'value': 0,
            'occurances': 1
          },
          'weight': {
            'value': 0,
            'occurances': 1
          },
          'diastolic': {
            'value': 0,
            'occurances': 1
          },
          'systolic': {
            'value': 0,
            'occurances': 1
          },
          'waistCirc': {
            'value': 0,
            'occurances': 1
          },
          'hipCirc': {
            'value': 0,
            'occurances': 1
          },
          'date': '',
      }
      if(groupAssessments.length > 0) {
        callFirstAssessment(groupAssessments)
      }
    }
  }
  function sortByDateAscending(a, b) {
    return a.date - b.date;
  }
  function orderReport () {
    var deferred = $q.defer();
    var orderedGroupAssessments = $scope.currentGroupAssessments.sort(sortByDateAscending)
    deferred.resolve(orderedGroupAssessments);
    return deferred.promise;
  }
  function limitByDate () {
    for(var i =0; i < $scope.allGroupAssessments.length; i++) {
      if($scope.allGroupAssessments[i].doc) {
        var groupDate = new Date($scope.allGroupAssessments[i].doc.date)
        var limitStart = new Date($scope.groupReport.startDate)
        var limitEnd = new Date($scope.groupReport.endDate)
        if(groupDate >= limitStart && groupDate <= limitEnd) {
          assessments.push($scope.allGroupAssessments[i])
        } else {
          console.log('out of range')
        }
      } else {
        console.log('no date', $scope.allGroupAssessments[i].doc)
      }
    }
  }
  function limitIndividualByDate () {
    $scope.linechartdata = []
    console.log('limit', $scope.memberAssessments)
    for(var i =0; i < $scope.memberAssessments.length; i++) {
      if($scope.memberAssessments[i].doc) {
        var memberDate = new Date($scope.memberAssessments[i].doc.date)
        var limitStart = new Date($scope.individualReport.startDate)
        var limitEnd = new Date($scope.individualReport.endDate)
        if(memberDate >= limitStart && memberDate <= limitEnd) {
          $scope.linechartdata.push($scope.memberAssessments[i])
        } else {
          console.log('out of range', $scope.memberAssessments[i].doc.date, $scope.individualReport.startDate, $scope.individualReport.endDate)
        }
      } else {
        console.log('no date', $scope.memberAssessments[i].doc)
      }
    }
  }
  $scope.getIndividualAssessments = function (member) {
    assessments.get(member._id).then(function (assessments) {
      $scope.memberAssessments = assessments
    })
  }
  $scope.generateGroupReport = function () {
    averageReport()
  }
  $scope.generateIndividualReport = function () {
    if($scope.memberAssessments) {
      limitIndividualByDate()
    }
  }
  $scope.showDetailReport = function (report) {
    if(report) {
      $state.go('currentReport', {data: report.data, metrics: $scope.groupMetric})
    } else {
      $state.go('currentReport', {data: $scope.linechartdata, metrics: $scope.groupMetric})
    }
  }
  $scope.clearReport = function () {
    $scope.linechartdata = []
  }
  $scope.searchOpen = {
    'open': false
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'reporting'
    }),
    topTools,
    h('.expandableSearch', {
      'style': 'position: absolute; top: 15px; right: 15px; display: block; z-index:5;'
    }, [
      h('.searchIconClick', {
        'data-ng-click': 'searchOpen.open = !searchOpen.open',
      }, [
        h('img#searchIcon', {
          'src': 'img/magGlass.png',
          'style': 'width: 20px; height: 20px;margin-top:10px;display:inline-block;float:left;cursor: pointer'
        }),
      ]),
      h('.searchField', {
        'data-ng-class': "searchOpen['open'] ? 'searchOpened' : 'searchClosed'",
      }, [
        h('input', {
          'type': 'text',
          'data-ng-model': 'searchText',
          'style': 'line-height:30px;width:100%;'
        })
      ])
    ]),
    h('.fixedContainerShort', {
      'id': 'allCards'
    }, [
      h('.col-md-12', {
        'data-ng-show': "view === 'home'"
      }, [
        h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
          'style': 'border: 2px dotted rgb(211, 211, 211); display: flex; align-items: center; justify-content: center; padding: 35px; background-color: rgb(237, 237, 237);',
          'data-ng-click': "view = 'new'"
        }, [
          h('a', {
            'style': 'cursor:pointer; text-align: center;',
            'data-ng-click': "view = 'new'"
          }, [
            h('h5.inline',  {
              'data-ng-click': "view = 'new'"
            }, ' +'),
            h('h5.inline.medGreyTxt', {
              'style': 'margin-left:10px;',
              'data-ng-click': "view = 'new'"
            }, 'Add New Report')
          ])
        ]),
        h('.allReports', [
          h('div.col-md-4', {
            'data-ng-repeat': 'report in allReports | filter: searchText',
            'data-ng-click': 'showDetailReport(report)'
          }, [
            h('div.movePanel.shadowHover', [
                h('p', '{{report.reportName}}'),
                h('p', {
                  'data-ng-if': 'report.createdBy'
                }, 'Created by {{report.createdBy}}'),
                h('p', {
                  'data-ng-if': 'report.date'
                }, 'on {{report.date | date: shortDate}}')
            ])
          ])
        ])
      ]),
      h('.col-md-12', {
        'data-ng-show': "view === 'new'",
        'style': 'position:absolute:top:0;'
      }, [
        h('.panel.panel-default.reportCard', [
          h('.panel-heading', [
            h('h5', {
              'style': 'display:inline-block;float:left;'
            }, 'New Report'),
            h('.cancelX', {
              'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "view = 'home'"
            }, 'X'),
          ]),
          h('.panel-body', [
            h('p.formP', 'REPORT NAME'),
            h('input.form-control', {
              'type': 'text',
              'data-ng-model': 'reportName',
              'required': ''
            }),
            h('hr', {
              'style':'border-top:0;'
            }),
            h('.col-md-6', [
              h('.reportTypeButton.col-md-12', {
                'data-ng-click': "view = 'individual'"
              }, 'Individual'),
            ]),
            h('.col-md-6', [
              h('.reportTypeButton.col-md-12', {
                'data-ng-click': "view = 'group'"
              }, 'Group'),
            ])
          ])
        ])
      ]),
      individualReporting,
      groupReporting,
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
    ])
  ])
}
