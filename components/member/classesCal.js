var h = require('hyperscript')
var topNav = require('./topNav.js')

module.exports = {
  url: '/classesCal',
  template: render().outerHTML,
  controller: ['$scope', 'store', 'members', 'courses', 'stats', '$stateParams', 'optionService', component]
}

function component ($scope, store, members, courses, stats, $stateParams, optionService) {
  $scope.page = 'classes'
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
  }
  $scope.memberCourses = [[]]
  $scope.statusOptions = optionService.get('status')
  stats.get('363409ecdc9e546b4096054654186ee7').then(function (memberStats) {})
  $scope.updateMember = function () {
    members.update($scope.currentMember).then(function (res) {
    })
  }
  courses.list().then(function (allCourses) {
    angular.forEach(allCourses, function (course) {
      var newCalObject = {
        'title': course.courseName,
        'start': course.endDate,
        'courseId': course._id
      }
      $scope.memberCourses[0].push(newCalObject)
    })
    console.log($scope.memberCourses)
  })
  console.log('reload')
  $scope.goToCourse = function (courseId) {
    console.log('hello from gotoCourse', courseId)
  }
  $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(event) {
          $state.go('currentClass', {course_id : event.courseId})
        }
      }
    };
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    topNav,
    h('.fixedContainer', [
      h('.calContainer', [
        h('div', {
          'data-ui-calendar': 'uiConfig.calendar',
          'data-ng-model': 'memberCourses'
        })
      ])
    ])
  ])
}
