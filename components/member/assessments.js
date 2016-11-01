var h = require('hyperscript')
var topNav = require('./topNav.js')
var newAssessmentModal = require('./newAssessmentModal')
var assessmentDetailModal = require('./assessmentDetailModal')

module.exports = {
  url: '/assessments/:member_id',
  template: render().outerHTML,
  controller: ['$scope', 'store', '$state', 'stats', 'assessments', '$stateParams', 'courses', 'optionService', 'users', '$uibModal', component]
}

function component ($scope, store, $state, stats, assessments, $stateParams, courses, optionService, users, $uibModal) {
  $scope.page = 'assessments'
  $scope.popup = {
    date: false
  }
  $scope.statusOptions = optionService.get('status')
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
  }
  courses.list().then(function (allCourses) {
    $scope.classOptions = allCourses
  })
  users.listTrainers().then(function (allTrainers) {
    $scope.allTrainers = allTrainers
  })
  assessments.get($scope.currentMember._id).then(function (memberAssessments) {
    $scope.memberAssessments = memberAssessments
    console.log(memberAssessments)
  })
  $scope.setCurrentAssessment = function (assessment) {
    store.set('currentAssessment', assessment)
    $scope.currentAssessment = assessment['doc']
  }
  $scope.memberAssessment = {
    'locationVal': '',
    'class': '',
    'time': '',
    'trainer': '',
    'chairTest': '',
    'chairTest1': '',
    'chairTest2': '',
    'sixMinWalk': '',
    'eightFoot1': '',
    'eightFoot2': '',
    'turnRight': '',
    'turnLeft': '',
    'armCurl': '',
    'heightFt': '',
    'heightIn': '',
    'weight': '',
    'diastolic': '',
    'systolic': '',
    'waistCirc': '',
    'hipCirc': '',
    'date': '',
  }

  $scope.addNewAssessment = function () {
    var newAssessment = {}
    newAssessment = {
      'location': $scope.memberAssessment.locationVal,
      'class': $scope.memberAssessment.class,
      'time': $scope.memberAssessment.time,
      'trainer': $scope.memberAssessment.trainer,
      'chairTest1': $scope.memberAssessment.chairTest1,
      'chairTest2': $scope.memberAssessment.chairTest2,
      'sixMinWalk': $scope.memberAssessment.sixMinWalk,
      'eightFoot1': $scope.memberAssessment.eightFoot1,
      'eightFoot2': $scope.memberAssessment.eightFoot2,
      'turnRight': $scope.memberAssessment.turnRight,
      'turnLeft': $scope.memberAssessment.turnLeft,
      'armCurl': $scope.memberAssessment.armCurl,
      'heightFt': $scope.memberAssessment.heightFt,
      'heightIn': $scope.memberAssessment.heightIn,
      'weight': $scope.memberAssessment.weight,
      'diastolic': $scope.memberAssessment.diastolic,
      'systolic': $scope.memberAssessment.systolic,
      'waistCirc': $scope.memberAssessment.waistCirc,
      'hipCirc': $scope.memberAssessment.hipCirc,
      'date': $scope.memberAssessment.date,
      'type': 'assessment',
      'parent_id': $scope.currentMember._id
    }
    if (newAssessment.date) {
      assessments.create(newAssessment).then(function (res) {
        var metric = newAssessment
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        })
      })
    } else {
      console.log('no date')
    }
  }
  $scope.updateMember = function () {
    members.update($scope.currentMember).then(function (res) {
    })
  }
  $scope.currentDate = new Date()
  $scope.hourOptions = optionService.get('hours')
  $scope.minOptions = optionService.get('minutes')
  $scope.mytime = new Date()
  $scope.hstep = 1
  $scope.mstep = 1
  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  }
  $scope.ismeridian = true

  $scope.currentHour = $scope.currentDate.getHours()
  $scope.currentMin = $scope.currentDate.getMinutes()
  $scope.currentPeriod

  var formatHour = function () {
    if ($scope.currentHour > 12) {
      $scope.currentHour = $scope.currentHour - 12
    }
  }
  var formatMin = function () {
    if ($scope.currentMin < 10) {
      $scope.currentMin = '0' + $scope.currentMin
    }
  }
  var getCurrentPeriod = function () {
    if ($scope.currentHour < 12) {
      $scope.currentPeriod = 'AM'
    } else {
      $scope.currentPeriod = 'PM'
    }
  }
  formatHour()
  formatMin()
  getCurrentPeriod()
  $scope.open = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: newAssessmentModal().outerHTML,
      scope: $scope
    });
  }
  $scope.openDetail = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: assessmentDetailModal().outerHTML,
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
      h('.col-md-12', [
        h('.col-md-12', [
          h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
            'style': 'background-color:#ededed; border: 2px dotted #D3D3D3; display: flex; align-items: center; justify-content: center; padding: 26px;',
            'data-ng-click': 'open()'
          }, [
            h('a', {
              'style': 'cursor:pointer'
            }, [
              h('h5.inline', ' +'),
              h('h5.inline.medGreyTxt', {
                'style': 'margin-left:10px;'
              }, 'Add New Assessment')
            ])
          ])
        ]),
        h('.col-md-4', {
          'data-ng-repeat': 'assessments in memberAssessments',
          'data-ng-click': 'setCurrentAssessment(assessments); openDetail()'
        }, [
          h('.panel.panel-default.shadowHover', {
            'style':'height:91px;'
          }, [
            h('.panel-body',  [
              h('h5', '{{assessments.doc.date | date: MM/dd/yyyy}}'),
              h('br'),
              h('p', {
                'style': 'color: gray'
              }, {
                'style': 'font-weight:bold'
              }, '{{assessments.doc.time}}')
            ])
          ])
        ])
      ])
    ])
  ])
}