var h = require('hyperscript')
var topTools = require('../shared/topTools.js')

module.exports = {
  url: '/assessmentDetail',
  template: render().outerHTML,
  controller: ['$scope', 'users', 'stats', 'store', '$stateParams', 'users', 'optionService', component]
}

function component ($scope, users, stats, store, $stateParams, users, optionService) {
  var assessment = store.get('currentAssessment')
  $scope.currentAssessment = assessment.doc
  console.log($scope.currentAssessment)
  $scope.time = {
    custom: false
  }
  $scope.profileScreen = 'show'
  users.listTrainers().then(function (allTrainers) {
    $scope.allTrainers = allTrainers
  })
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
  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime, $scope.minutes)
  }

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
    topTools,
    h('.fixedContainerShort#assessmentDetailContainer', [
      h('.col-md-11', {
        'style': 'background-color:white; margin-left:20px; margin-right:20px; padding:40px; border-radius:4px;border: 1px solid DDDDDD;'
      }, [
        h('div', [
          h('.col-md-6.courseInfo', [
            h('br'),
            h('p.formP', 'LOCATION'),
            h('input.form-control', {
              'type': 'text',
              'data-ng-model': 'currentAssessment.location',
              'required': ''
            })
          ]),
          h('.col-md-6.courseInfo', [
            h('br'),
            h('p.formP', 'CLASS'),
            h('select.form-control', {
              'id': 'classControl',
              'data-ng-model': 'currentAssessment.class'
            }, [
              h('option', {
                'data-ng-repeat': 'class in classOptions'
              }, '{{class}}')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'DATE'),
            h('p.input-group', [
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
                'data-ng-model': 'currentAssessment.date',
                'style': 'padding:0;'
              }, [
                h('button .btn .btn-default', {
                  'type': 'button',
                  'data-ng-click': "popup['date'] = true",
                  'style': 'border:none;float:right;'
                }, [
                  h('i.glyphicon .glyphicon-calendar')
                ])
              ], "{{currentAssessment.date | date:'MM/dd/yyyy'|| 'set date'}}")
            ])
          ]),
          h('.col-md-6.courseInfo', {
            'data-ng-show': "time['custom']"
          }, [
            h('p.formP', 'TIME'),
            h('uib-timepicker.inline', {
              'data-ng-model': 'currentAssessment.time',
              'data-ng-change': 'changed()',
              'data-hour-step': 'hstep',
              'data-minute-step': 'mstep',
              'data-show-meridian': 'ismeridian',
              'style': 'float:left'
            }),
            h('.edit.inline', {
              'data-ng-click': "time['custom'] = false",
              'style': 'margin-left: 10px; float: left; line-height: 100px;'
            }, [
                h('i.glyphicon .glyphicon-ok.inline')
              ])
          ]),
          h('.col-md-6.courseInfo', {
            'data-ng-hide': "time['custom']"
          }, [
            h('p.formP', 'TIME'),
            h('h6.inline', "{{currentAssessment.time | date: 'hh:mm' || 'NA'}}"),
            h('.edit.inline', {
              'data-ng-click': "time['custom'] = true",
              'style': 'margin-left: 10px;'
            }, [
                h('i.glyphicon .glyphicon-time.inline'),
                h('h6.inline.greyTxt', {
                  'style': 'margin-left: 10px'
                }, 'edit')
              ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'TRAINER'),
            h('select.form-control', {
              'id': 'trainerControl'
            }, [
              h('option', {
                'data-ng-repeat': 'trainer in allTrainers'
              }, '{{trainer.firstName}} {{trainer.lastName}}')
            ])
          ])
        ]),
        h('div', [
          h('.col-md-6.courseInfo', [
            h('p.formP', 'CHAIR STAND TEST'),
            h('input.form-control', {
              'type': 'text',
              'data-ng-model': 'currentAssessment.chairTest'
            })
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'SIX MINUTE WALK'),
            h('input.form-control', {
              'type': 'text',
              'data-ng-model': 'currentAssessment.sixMinWalk'
            })
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'CHAIR STAND TEST'),
            h('div', {
              'style':'display: inline-block ;'
            }, [
              h('h5', {
                'style':'display: inline-block ;'
              }, '1.'),
              h('input.form-control', {
                'style': 'width:25%; margin:5px;display:inline-block;',
                'type': 'number',
                'min': '0',
                'data-ng-model': 'currentAssessment.chairTest1'
              }),
              h('p', {
                'style':'display: inline-block;'
              }, 'inches')
            ]),
            h('div', {
              'style':'display: inline-block ;'
            }, [
              h('p', {
                'style':'display: inline-block ;'
              }, '2.'),
              h('input.form-control', {
                'style': 'width:25%; margin:5px;display:inline-block;',
                'type': 'number',
                'min': '0',
                'data-ng-model': 'currentAssessment.chairTest2'
              }),
              h('p', {
              'style':'display: inline-block ;'
              }, 'inches')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'EIGHT FOOT UP AND GO'),
            h('div', {
              'style':'display: inline-block ;'
            }, [
              h('p', {
                'style':'display: inline-block ;'
              }, '1.'),
              h('input.form-control', {
                'style': 'width:25%; margin:5px;display:inline-block;',
                'type': 'number',
                'min': '0',
                'data-ng-model': 'currentAssessment.eightFoot1'
              }),
              h('p', {
                'style':'display: inline-block ;'
              }, 'inches')
            ]),
            h('div', {
              'style':'display: inline-block ;'
            }, [
              h('p', {
                'style':'display: inline-block ;'
              }, '2.'),
              h('input.form-control', {
                'style': 'width:25%; margin:5px;display:inline-block;',
                'type': 'number',
                'min': '0',
                'data-ng-model': 'currentAssessment.eightFoot2'
              }),
              h('p', {
                'style':'display: inline-block ;'
              }, 'inches')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'TURN TEST 360 RIGHT'),
            h('div', {
              'style':'display: inline-block;'
            }, [
              h('input.form-control', {
                'type': 'number',
                'min': '0',
                'style':'display: inline-block; width:80%; margin-top:5px;margin-right:5px;',
                'data-ng-model': 'currentAssessment.turnRight'
              }),
              h('p', {
                'style':'display: inline-block;',
              }, 'steps')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'TURN TEST 360 LEFT'),
            h('div', {
              'style':'display: inline-block;'
            }, [
              h('input.form-control', {
                'type': 'number',
                'min': '0',
                'style':'display: inline-block; width:80%; margin-top:5px;margin-right:5px;',
                'data-ng-model': 'currentAssessment.turnLeft'
              }),
              h('p', {
                'style':'display: inline-block;',
              }, 'steps')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'STAND ON ONE LEG'),
            h('div', {
              'style': 'display:inline-block;'
            }, [
              h('input.form-control', {
                'style':'display: inline-block; width:80%; margin-top:5px;margin-right:5px;',
                'type': 'number',
                'min': '0',
                'data-ng-model': 'currentAssessment.oneLeg'
              }),
              h('p', {
                'style': 'display:inline-block;'
              }, 'steps')
            ])

          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'ARM CURL'),
            h('div', {
              'style': 'display:inline-block;'
            }, [
              h('input.form-control', {
                'type': 'number',
                'min': '0',
                'style':'display: inline-block; width:60%; margin-top:5px;margin-right:5px;',
                'data-ng-model': 'currentAssessment.armCurl'
              }),
              h('p', {
                'style': 'display:inline-block;'
              }, 'in 30 seconds')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'HEIGHT'),
            h('div', {
              'style': 'display:inline-block;'
            }, [
              h('input.form-control', {
                'type': 'number',
                'min': '0',
                'max': '9',
                'style': 'width:25%; margin-right:5px;display:inline-block;',
                'data-ng-model': 'currentAssessment.heightFt'
              }),
              h('p', {
                'style': 'display:inline-block;'
              }, 'ft'),
              h('input.form-control', {
                'type': 'number',
                'min': '0',
                'min': '11',
                'style': 'width:25%; display:inline-block;margin-left: 5px; margin-right:5px;',
                'data-ng-model': 'currentAssessment.heightIn'
              }),
              h('p', {
                'style': 'display:inline-block;'
              }, 'in')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'WEIGHT'),
            h('div', {
              'style': 'display:inline-block;'
            }, [
              h('input.form-control', {
                'type': 'number',
                'min': '0',
                'max': '500',
                'style':'width:80%;margin-right:5px;display:inline-block;',
                'data-ng-model': 'currentAssessment.weight'
              }),
              h('p', {
                'style': 'display:inline-block;'
              }, 'lbs')
            ])
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'SYSTOLIC'),
            h('input.form-control', {
              'type': 'number',
              'min': '0',
              'data-ng-model': 'currentAssessment.systolic'
            })
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'DIASTOLIC'),
            h('input.form-control', {
              'type': 'number',
              'min': '0',
              'data-ng-model': 'currentAssessment.diastolic'
            })
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'WAIST CIRCUMFERENCE'),
            h('input.form-control', {
              'type': 'number',
              'min': '0',
              'data-ng-model': 'currentAssessment.waistCirc'
            })
          ]),
          h('.col-md-6.courseInfo', [
            h('p.formP', 'HIP CIRCUMFERENCE'),
            h('input.form-control', {
              'type': 'number',
              'min': '0',
              'data-ng-model': 'currentAssessment.hipCirc'
            })
          ])
        ]),
          h('hr'),
          h('btn.btn-lg.btn-default.inline', {
            'style': 'position:middle;margin-right:15px;',
            'data-ui-sref': 'assessments'
          }, 'Back'),
          h('btn.btn-lg.btn-primary.inline', {
            'style': 'position:middle;'
          }, 'SAVE')
      ])
    ]),
  ])
}
