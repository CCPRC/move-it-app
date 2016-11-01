var h = require('hyperscript')
var topTools = require('../shared/topTools.js')
var _ = require('underscore')

module.exports = {
  url: '/currentClass',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'users', 'stats', 'store', '$stateParams', 'trainers', 'optionService', 'courses', 'members', 'dragulaService', component],
  params: {
    course_id: null
  }
}

function component ($scope, $state, users, stats, store, $stateParams, trainers, optionService, courses, members, dragulaService) {
  // $scope.$on('bag-one.drag', function (e, el) {
  //   el.addClass('moved')
  // })
  $scope.removeParticipant = function (el) {
    $scope.currentCourse.attendance.splice(el, 1)
    runAttendanceCheck()
  }
if($stateParams.course_id) {
  courses.get($stateParams.course_id).then(function(course) {
    console.log(course)
    $scope.currentCourse = course
  })
} else if (store.get('currentCourse')) {
  $scope.currentCourse = store.get('currentCourse')
    console.log('store', $scope.currentCourse)
} else {
  $state.go('classes')
}
  $scope.profileScreen = 'show'
  // console.log($scope.currentCourse)
  $scope.init = function () {
    $scope.status = true
  }
  $scope.popup = {
    date: false
  }
  $scope.changeStatus = function () {
    $scope.status = !$scope.status
  }
  $scope.updateClass = function () {
    courses.update($scope.currentCourse).then(function (res) {
      $state.go('classes')
    })
  }

  $scope.deleteClass = function () {
    console.log("delete");
    courses.remove($scope.currentCourse._id).then(function (res) {
      console.log($scope.currentCourse);
      $state.go('classes')
    })
  }
  $scope.repeatOptions = optionService.get('repeats')
  $scope.hourOptions = optionService.get('hours')
  $scope.programOptions = ['program1', 'program2']
  $scope.durations = optionService.get('durations')
  $scope.minuteOptions = optionService.get('minutes')
  $scope.periodOptions = optionService.get('periods')
  trainers.list().then(function (allTrainers) {
    $scope.trainerOptions = allTrainers
  })
  members.list().then(function (allMembers) {
    $scope.allPeople = allMembers
    if ($scope.currentCourse.attendance) {
      for (var i = 0; i < $scope.allPeople.length; i++) {
        for (var j = 0; j < $scope.currentCourse.attendance.length; j ++) {
          if ($scope.currentCourse.attendance[j]._id === $scope.allPeople[i]._id) {
            $scope.allPeople.splice(i, 1)
          }
        }
      }
    }
  })
  function runAttendanceCheck () {
    members.list().then(function (allMembers) {
      $scope.allPeople = allMembers
      if ($scope.currentCourse.attendance) {
        for (var i = 0; i < $scope.allPeople.length; i++) {
          for (var j = 0; j < $scope.currentCourse.attendance.length; j ++) {
            if ($scope.currentCourse.attendance[j]._id === $scope.allPeople[i]._id) {
              $scope.allPeople.splice(i, 1)
            }
          }
        }
      }
    })
  }
  // $scope.$watch('currentCourse.ends', function() {
  //   if($scope.currentCourse.ends) {
  //   }
  //   else {
  //     $scope.currentCourse.occurances = ''
  //     $scope.currentCourse.endDate = ''
  //   }
  // })
  // $scope.$watch('currentCourse.occurances', function () {
  //   if($scope.currentCourse.occurances > 0) {
  //     $scope.currentCourse.ends = true
  //     $scope.currentCourse.endDate = ''
  //   }
  // })
  // $scope.$watch('currentCourse.endDate', function () {
  //   if($scope.currentCourse.endDate) {
  //     $scope.currentCourse.ends = true
  //     $scope.currentCourse.occurances = ''
  //   }
  // })
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'classes'
    }),
    topTools,
    h('nav.navbar.navbar-default.fixedHeader', {
      'style': 'height:120px;'
    }, [
      h('div', {
        'style': 'margin-left:30px;margin-top:10px;'
      }, [
        h('h4', {
          'style': 'line-height:0.2;'
        }, '{{course.courseName}}'),
        h('h5', {
          'style': 'color:gray'
        }, '{{course.courseCode}}'),
        h('div', {
          'style': 'margin: 0 0 0 1100px'
        }, [
          h('a', {
            'href': '#/all'
          }, [
            h('img', {
              'src': 'img/peopleIcon.svg',
              'style': 'display: inline-block;position: fixed;top: 10px;right: 10px;'
            })
          ])
        ])
      ]),
      h('.infoTab.selectedTopNav', {
        'style': 'position:absolute;left:50px;bottom:0px;line-height:37px;'
      }, 'INFO')
    ]),
    h('.fixedContainer', {
      'data-ng-show': "profileScreen === 'show'"
    }, [
      h('.col-md-11', {
        'style': 'background-color:white; margin-left:20px; padding:40px; border-radius:4px;border: 1px solid DDDDDD'
      }, [
        h('.row', [
          h('.col-md-4', [
            h('.form-group', [
              h('label.formP', 'NAME'),
              h('input.form-control', {
                'id': 'courseName',
                'type': 'text',
                'placeholder': '{{currentCourse.courseName}}',
                'data-ng-model': 'currentCourse.courseName'
              })
            ])
          ]),
          h('.col-md-4', [
            h('label.formP', 'CODE'),
            h('input.form-control', {
              'id': 'code',
              'type': 'text',
              'placeholder': '{{currentCourse.courseCode}}',
              'data-ng-model': 'currentCourse.courseCode'
            })
          ]),
          h('.col-md-4', [
            h('label.formP', 'ADDRESS'),
            h('input.form-control', {
              'id': 'address',
              'type': 'text',
              'placeholder': '{{currentCourse.address}}',
              'data-ng-model': 'currentCourse.address'
            })
          ])
        ]),
        h('hr'),
        h('.row', [
          h('.col-md-4', [
            h('.form-group', [
              h('label.formP', 'DURATION'),
              h('select.form-control', {
                'id': 'interval',
                'data-ng-value': 'currentCourse.duration',
                'data-ng-model': 'currentCourse.duration'
              }, [
                h('option', {
                  'data-ng-repeat': 'duration in durations'
                }, '{{duration}}')
              ])
            ])
          ]),
          h('.col-md-4', [
            h('.form-group', {
              'style': 'display:block;'
            }, [
              h('label.formP', 'TIME'),
              h('br'),
              h('select.form-control', {
                'style': 'width:60px;display:inline',
                'id': 'hour',
                'data-ng-value': 'currentCourse.hr',
                'data-ng-model': 'currentCourse.hr'
              }, [
                h('option', {
                  'data-ng-repeat': 'hourVal in hourOptions'
                }, '{{hourVal}}')
              ]),
              h('p', {
                'style': 'display:inline; margin-left:5px; margin-right:5px;'
              }, ':'),
              h('select.form-control', {
                'style': 'width:60px;margin-right:5px;display:inline',
                'id': 'min',
                'data-ng-value': 'currentCourse.min',
                'data-ng-model': 'currentCourse.min'
              }, [
                h('option', '00'),
                h('option', '15'),
                h('option', '30')
              ]),
              h('select.form-control', {
                'style': 'width:60px; display:inline',
                'id': 'amPm',
                'data-ng-value': 'currentCourse.amPm',
                'data-ng-model': 'currentCourse.amPm'
              }, [
                h('option', 'AM'),
                h('option', 'PM')
              ])
            ])
          ])
        ]),
        h('.row', [
          h('.col-md-12', [
            h('label.formP', 'ON DAYS'),
            h('br'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'sund',
                'data-ng-model': 'currentCourse.onDays.sund',
              })
            ], 'Sun'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'mon',
                'data-ng-model': 'currentCourse.onDays.mon'
              })
            ], 'Mon'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'tues',
                'data-ng-model': 'currentCourse.onDays.tues'
              })
            ], 'Tue'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'wed',
                'data-ng-model': 'currentCourse.onDays.wed'
              })
            ], 'Wed'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'thu',
                'data-ng-model': 'currentCourse.onDays.thu'
              })
            ], 'Thu'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'fri',
                'data-ng-model': "currentCourse.onDays.fri"
              })
            ], 'Fri'),
            h('label.checkbox-inline', [
              h('input', {
                'type': 'checkbox',
                'name': 'sat',
                'data-ng-model': 'currentCourse.onDays.sat'
              })
            ], 'Sat')
          ]),
          h('.col-md-12', {
            'style': 'display:block'
          }, [
            h('label.formP', 'ENDS'),
            h('br'),
            h('label.radio-inline', [
              h('input', {
                'type': 'radio',
                'name': 'optradio',
                'data-ng-model': 'currentCourse.ends'
              })
            ], 'Never'),
            h('label.radio-inline', 'After'),
            h('form-inline', {
              'style': 'display:inline;'
            }, [
              h('.form-group', {
                'style': 'display:inline;'
              }, [
                h('input.form-control', {
                  'type': 'number',
                  'style': 'width:60px;margin-left:10px; display:inline;',
                  'name': 'afterNum',
                  'min': '0',
                  'id': 'occurances',
                  'data-ng-model': 'currentCourse.occurances'
                })
              ]),
              h('label', {
                'style': 'padding-left:5px;',
                'for': 'occurances'
              }, 'occurances')
            ]),
            h('label.radio-inline', {
              'style': 'margin-left:10px;'
            }, 'On'),
            h('.form-group', {
              'style': 'display:inline;'
            }, [
              h('.optBox', {
                'style': 'margin-bottom: -13px; margin-left: 0;'
              }, [
                h('.input .form-control', {
                  'type': 'text',
                  'data-uib-datepicker-popup': '{{format}}',
                  'data-is-open': 'popup.date',
                  'data-min-date': 'minDate',
                  'data-max-date': 'maxDate',
                  'date-datepicker-options': 'dateOptions',
                  'data-date-disabled': 'disabled(date, mode)',
                  'data-ng-required': 'true',
                  'data-close-text': 'Close',
                  'data-ng-model': 'currentCourse.endDate',
                  'data-ng-click': 'repeatValue(on)',
                  'style': 'padding:0;padding-left:10px;line-height:30px;width: 200px;margin-left: 20px;'
                }, [
                  h('button .btn .btn-default', {
                    'type': 'button',
                    'data-ng-click': "popup['date'] = true",
                    'style': 'border:none;float:right;'
                  }, [
                    h('i.glyphicon .glyphicon-calendar')
                  ])
                ], "{{currentCourse.endDate | date:'MM/dd/yyyy'}}")
              ])
            ])
          ])
        ]),
        h('hr'),
        h('.row', [
          h('.col-md-4', [
            h('.form-group', [
              h('label.formP', 'PROGRAM'),
              h('select.form-control', {
                'id': 'program',
                'type': 'text',
                'data-ng-value': 'currentCourse.program',
                'data-ng-model': 'currentCourse.program'
              }, [
                h('option', {
                  'data-ng-repeat': 'programVal in programOptions'
                }, '{{programVal}}')
              ])
            ])
          ]),
          h('.col-md-4', [
            h('label.formP', 'TRAINER'),
            h('select.form-control', {
              'id': 'trainer',
              'type': 'text',
              'data-ng-value': 'currentCourse.trainer',
              'data-ng-model': 'currentCourse.trainer'
            }, [
              h('option', {
                'data-ng-repeat': 'trainerVal in trainerOptions'
              }, '{{trainerVal.firstName}} {{trainerVal.lastName}}')
            ])

          ]),
          h('.col-md-4', [
            h('label.formP', 'MAX. NUMBER OF PARTICIPANTS'),
            h('input.form-control', {
              'id': '',
              'type': 'number',
              'min': '0',
              'placeholder': '{{currentCourse.maxMembers}}',
              'data-ng-model': 'currentCourse.maxMembers'
            })
          ])
        ]),
        h('hr'),
        h('.row#participantEdit.col-md-12', {
          'style': 'padding-bottom: 20px;'
        }, [
          h('.col-md-6', [
            h('h4', 'Attendance'),
            h('div.participants#participants.container', {
              'data-dragula': "'bag-one'",
              'data-dragula-model': 'currentCourse.attendance',
              'style': 'width:100%;'
            }, [
              h('h4.medGreyTxt', {
                'data-ng-hide': 'currentCourse.attendance.length > 0',
                'style': 'text-align:center;'
              }, 'drag and drop from All People'),
              h('.personBlock', {
                'data-ng-repeat': 'participant in currentCourse.attendance',
                'data-dragula-model': 'currentCourse.attendance',
                'data-ng-scope': '$parent'
              }, [
                h('.createX.fa.fa-times', {
                  'style': 'float:right;',
                  'data-ng-click': 'removeParticipant(el)'
                })
              ], '{{participant.firstName}} {{participant.lastName}}')
            ])
          ]),
          h('.col-md-6', [
            h('h4', 'All People'),
            h('div.listOfPeople#listOfPeople.container', {
              'data-dragula': "'bag-one'",
              'data-dragula-model': 'allPeople',
              'style': 'width:100%;'
            }, [
              h('div.personBlock', {
                'data-ng-repeat': "person in allPeople | orderBy: 'lastName'",
                'data-dragula-model': 'allPeople',
                'data-ng-scope': '$parent'
              }, '{{person.firstName}} {{person.lastName}}')
            ])
          ])
        ]),
        h('hr'),
        h('btn.btn-lg.btn-default.inline', {
          'style': 'position:middle;margin-right:15px;',
          'data-ui-sref': 'classes'
        }, 'Back'),
        h('btn.btn-lg.btn-primary', {
          'style': 'position:middle;',
          'data-ng-click': 'updateClass()'
        }, 'SAVE'),
        h('btn.btn-lg.btn-primary', {
          'style': 'position:middle;',
          'data-ng-click': 'deleteClass()'
        }, 'DELETE')
      ])
    ])
  ])
}
