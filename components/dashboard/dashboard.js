var h = require('hyperscript')

module.exports = {
  url: '/dashboard',
  template: render().outerHTML,
  controller: ['$scope', 'store', '$state', 'courses', 'members', component]
}

function component ($scope, store, $state, courses, members) {
  $scope.currentUser = store.get('fullProfile')
  $scope.allCourses = [[]]
  $scope.pendingReferrals = []
  members.list().then(function (allMembers) {
    angular.forEach(allMembers, function (member) {
      if(member.status === 'Pending') {
        $scope.pendingReferrals.push(member)
        console.log(member)
      }
    })
  })
  $scope.testEvents = [
    [
      {
            'id': '112',
            'title': 'Event1',
            'start': '2016-07-04'
        },
        {
            'id': '233',
            'title': 'Event2',
            'start': '2016-07-05'
        }
      ]
    ]
  courses.list().then(function (allCourses) {
    angular.forEach(allCourses, function (course) {
      var newCalObject = {
        'title': course.courseName,
        'start': course.endDate,
        'courseId': course._id
      }
      $scope.allCourses[0].push(newCalObject)
    })
  })
  $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(event) {
          $state.go('classes', {course_id : event.courseId})
        }
      }
    };
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'dashboard'
    }),
    h('.topToolBar', [
      h('img', {
        'src': 'img/bolt.svg', 'style': 'padding-left:10px; margin-top:-10px;'
      }),
      h('.toptext', 'Welcome back, {{currentUser.firstName | capitalize }}')
    ]),
    h('.fixedContainerShort', [
      h('.col-md-6', [
        h('.panel.panel-default', [
          h('.panel-heading', 'Pending Referrals'),
          h('.panel-body', {
            'data-ng-repeat': 'participant in pendingReferrals'
          }, [
            h('.infoStrip', [
              h('.abrvNameAvatar', [
                h('img', {
                  'data-ng-show': 'participant.avatar',
                  'data-ng-src': '{{participant.avatar}}',
                  'style': 'float:left; width:40px; height:40px; border-radius:100%; margin-right:15px;'
                }),
              ]),
              h('.stripTextBox', [
                h('.stripName', '{{participant.firstName}} {{participant.lastName}}'),
                h('.stripType', {
                  'data-ng-hide': "participant.type === 'member'"
                }, '{{participant.type}}'),
                h('.stripType', {
                  'data-ng-show': "participant.type === 'member'"
                }, 'participant')
              ])
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', [
          h('.panel-heading', 'Following'),
          h('.panel-body', [
            h('.infoStrip', [
              h('.abrvNameAvatar'),
              h('.stripTextBox', [
                h('.stripName'),
                h('.stripType')
              ])
            ])
          ])
        ])
      ]),
      h('.col-md-12', [
        h('div', {
          'data-ui-calendar': 'uiConfig.calendar',
          'data-ng-model': 'allCourses'
        })
      ])
    ])
  ])
}
