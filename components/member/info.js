var h = require('hyperscript')
var topNav = require('./topNav.js')

module.exports = {
  url: '/info',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'members', 'stats', '$stateParams', '$state', 'courses', 'groups', 'optionService', component]
}

function component ($scope, $state, store, members, stats, $stateParams, $state, courses, groups, optionService) {
  $scope.page = 'info'
  $scope.currentMember = store.get('currentMember')
  $scope.statusOptions = optionService.get('status')
  $scope.ethnicities = optionService.get('ethnicities')
  $scope.ages = optionService.get('ages')
  $scope.hospitals = optionService.get('hospitals')
  $scope.physicians = optionService.get('physicians')
  $scope.heights = optionService.get('heights')
  $scope.physicalDates = optionService.get('physicalDates')
  $scope.statuses = optionService.get('statuses')
  $scope.sourceOptions = optionService.get('sources')
  groups.list().then(function (allGroups) {
    $scope.groups = allGroups
  })
  courses.list().then(function (allCourses) {
    $scope.classOptions = allCourses
  })
  $scope.states = $scope.sourceOptions = optionService.get('states')
  $scope.days = $scope.sourceOptions = optionService.get('days')
  $scope.years = optionService.get('years')
  $scope.months = optionService.get('months')
  $scope.popup = {
    enrollment: false,
    baseline: false,
    mostRecentAppt: false
  }
  $scope.showThis = {
    generalEdit: false,
    measurementsEdit: false,
    contactEdit: false,
    membershipEdit: false,
    questionnaireEdit: false
  }
  $scope.physician = store.get('currentPhysician')
  $scope.physician_id = $stateParams.physician_id
  $scope.file

  $scope.uploadFiles = function(file, errFiles) {
    $scope.file = file
    $scope.errFile = errFiles && errFiles[0]
  }

  function determineAge () {
    if ($scope.currentMember) {
      if ($scope.currentMember.birthYear && $scope.currentMember.birthDay && $scope.currentMember.birthMonth) {
        var todayYear = new Date().getFullYear()
        var todayMonth = new Date().getMonth()
        var todayDay = new Date().getDate()
        var memberAge = todayYear - $scope.currentMember.birthYear
        $scope.currentMember.age = memberAge
      }
    }
  }
  $scope.updateMember = function () {
    members.update($scope.currentMember).then(function (res) {
    })
    determineAge()
  }
  $scope.messageEnterPress = function (event) {
   if (!event.shiftKey && event.keyCode === 13) {
     event.preventDefault()
     $scope.updateMember()
   }
 }
  determineAge()
}

function render () {
  return h('DIV', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    topNav,
    h('.fixedContainer', {
      'style': 'overflow:scroll;'
    }, [
      h('.col-md-6', [
        h('.panel.panel-default', {
          'data-ng-hide': "showThis['generalEdit']"
        }, [
          h('.panel-heading', [
            h('h5', 'General'),
            h('i.glyphicon .glyphicon-cog .editCog', {
              'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['generalEdit'] = true"
            }),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP.infoP', 'FIRST NAME'),
              h('p.bold', '{{currentMember.firstName}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'LAST NAME'),
              h('p.bold', '{{currentMember.lastName}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'DATE OF BIRTH'),
              h('p.bold', {
                'data-ng-if': 'currentMember.birthMonth'
              },'{{currentMember.birthMonth}}/{{currentMember.birthDay}}/{{currentMember.birthYear}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'AGE'),
              h('p.bold', '{{currentMember.age}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'MOST RECENT APPT'),
              h('p.bold', "{{currentMember.mostRecentAppt | date:'MM/dd/yyyy'}}")
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'HOSPITAL'),
              h('p.bold', '{{currentMember.hospital}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'PHYSICIAN'),
              h('p.bold', '{{currentMember.physician}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'PHOTO'),
              h('img', {
                'data-ng-src': "{{currentMember.avatar || 'img/images.png'}}",
                'style': 'float:left; height:60px;width:60px; margin: 5px 5px 0px 0px; border-radius:100%;'
              }),
            ])
          ])
        ]),

        h('.panel.panel-default', {
          'data-ng-show': "showThis['generalEdit']",
          'data-ng-keypress': 'messageEnterPress($event)'

        }, [
          h('.panel-heading', [
            h('h5', 'General'),
            h('.createCheck.fa.fa-check .editCog', {
              'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['generalEdit'] = false; updateMember()"
            }),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'FIRST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.firstName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'LAST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'BIRTH DATE'),
              h('select#sel1.form-control.inline', {
                'data-ng-model': 'currentMember.birthMonth',
                'required': '',
                'style': 'width:30%;margin-right:5%;'
              }, [
                h('option', {
                  'data-ng-repeat': 'month in months'
                }, '{{month}}')
              ]),
              h('select#sel1.form-control.inline', {
                'data-ng-model': 'currentMember.birthDay',
                'required': '',
                'style': 'width:30%;margin-right:5%;'
              }, [
                h('option', {
                  'data-ng-repeat': 'day in days'
                }, '{{day}}')
              ]),
              h('select#sel1.form-control.inline', {
                'data-ng-model': 'currentMember.birthYear',
                'required': '',
                'style': 'width:30%;'
              }, [
                h('option', {
                  'data-ng-repeat': 'year in years'
                }, '{{year}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'ETHNICITY'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.ethnicity',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'ethnicity in ethnicities'
                }, '{{ethnicity}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'GENDER'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.gender',
                'required': ''
              }, [
                h('option', 'Male'),
                h('option', 'Female')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'HOSPITAL'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.hospital',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'hospital in hospitals'
                }, '{{hospital}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'PHYSICIAN'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.physician',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'physician in physicians'
                }, '{{physician}}')
              ])
            ]),
            h('.col-md-12', [
              h('p.formP', 'PHOTO'),
              h('img.preview', {
                'data-ngf-src': "currentMember.avatar",
                'style': 'float:left;margin: 5px 5px 0px 0px; border-radius:100%;height:30px;width:30px;'
              }),
              h('input', {
                'id': 'userAvatar',
                'type': 'file',
                'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
                'data-ngf-max-size':'2MB',
                'data-accept': 'image/*',
                'data-ng-model': 'currentMember.avatar'
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'MOST RECENT APPT'),
              h('p.input-group', [
                h('.input .form-control .mostRecentApptInput', {
                  'type': 'text',
                  'data-uib-datepicker-popup': '{{format}}',
                  'data-is-open': 'popup.mostRecentAppt',
                  'data-min-date': 'minDate',
                  'data-max-date': 'maxDate',
                  'date-datepicker-options': 'dateOptions',
                  'data-date-disabled': 'disabled(date, mode)',
                  'data-ng-required': 'true',
                  'data-close-text': 'Close',
                  'data-ng-model': 'currentMember.mostRecentAppt',
                  'style': 'padding:0;padding-left:10px;line-height:30px;width: 45%;'
                }, [
                  h('button .btn .btn-default', {
                    'type': 'button',
                    'data-ng-click': "popup['mostRecentAppt'] = true",
                    'style': 'border:none;float:right;'
                  }, [
                    h('i.glyphicon .glyphicon-calendar')
                  ])
                ], "{{currentMember.mostRecentAppt | date:'MM/dd/yyyy'|| 'set date'}}")
              ])
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'data-ng-hide': "showThis['measurementsEdit']"
        }, [
          h('.panel-heading', [
            h('h5', 'Measurements'),
            h('i.glyphicon .glyphicon-cog .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['measurementsEdit'] = true"
            }),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP.infoP', 'WEIGHT'),
              h('p.bold', '{{currentMember.weight}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'HEIGHT'),
              h('p.bold', '{{currentMember.height}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'BODY MASS INDEX'),
              h('p.bold', '{{currentMember.BMI}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'SYSTOLIC'),
              h('p.bold', '{{currentMember.systolic}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'DIASTOLIC'),
              h('p.bold', '{{currentMember.diastolic}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'WAIST'),
              h('p.bold', '{{currentMember.waist}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'WAIST TO HIP'),
              h('p.bold', '{{currentMember.w2h}}')
            ])
          ])
        ]),

        h('.panel.panel-default', {
          'data-ng-show': "showThis['measurementsEdit']",
          'data-ng-keypress': 'messageEnterPress($event)'

        }, [
          h('.panel-heading',  [
            h('h5', 'Measurements'),
            h('.createCheck.fa.fa-check .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['measurementsEdit'] = false; updateMember()"
            }),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p', 'WEIGHT'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.weight',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'HEIGHT'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.height',
                'required': ''
              }, [
                h('option', {'data-ng-repeat': 'height in heights'}, '{{height}}')
              ])
            ]),
            h('.col-md-6', [
              h('p', 'BODY MASS INDEX'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.bmi',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'DIASTOLIC'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.diastolic',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'SYSTOLIC'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.systolic',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'WAIST (INCHES)'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.waist',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'WAIST TO HIP (INCHES)'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.w2h',
                'required': ''
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', {
      }, [
        h('.panel.panel-default', {
          'style': 'min-height:105px;'
        }, [
          h('.panel-heading', [
            h('h5', 'Questionnaire'),
            h('i.glyphicon .glyphicon-cog .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ui-sref': 'questionnaire({member_id: member_id})'
            })
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'data-ng-hide': "showThis['contactEdit']"
        }, [
          h('.panel-heading', [
            h('h5', 'Contact'),
            h('i.glyphicon .glyphicon-cog .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['contactEdit'] = true"
            }),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP.infoP', 'ADDRESS'),
              h('p.bold', '{{currentMember.address}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'CITY'),
              h('p.bold', '{{currentMember.city}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'STATE'),
              h('p.bold', '{{currentMember.state}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'ZIPCODE'),
              h('p.bold', '{{currentMember.zipcode}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'PHONE NUMBER'),
              h('p.bold', '{{currentMember.phoneNumber}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'EMAIL'),
              h('p.bold', '{{currentMember.email}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'EMERGENCY NUMBER'),
              h('p.bold', '{{currentMember.emergencyPhone}}')
            ])
          ])
        ]),

        h('.panel.panel-default', {
          'data-ng-show': "showThis['contactEdit']",
          'data-ng-keypress': 'messageEnterPress($event)'

        }, [
          h('.panel-heading', [
            h('h5', 'Contact'),
            h('.createCheck.fa.fa-check .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['contactEdit'] = false; updateMember()"
            })
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p', 'ADDRESS'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.address',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'CITY'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.city',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'STATE'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.state',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'state in states'
                }, '{{state}}')
              ])
            ]),
            h('.col-md-6', [
              h('p', 'ZIP CODE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.zipcode',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.phone',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'EMAIL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.email',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p', 'EMERGENCY PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentMember.emergencyPhone',
                'required': ''
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'data-ng-hide': "showThis['membershipEdit']"
        }, [
          h('.panel-heading', [
            h('h5', 'Membership'),
            h('i.glyphicon .glyphicon-cog .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['membershipEdit'] = true"
            })
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP.infoP', 'ENROLLMENT DATE'),
              h('p.bold', '{{currentMember.enrollmentDate}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'BASELINE ASSESSMENT'),
              h('p.bold', '{{currentMember.baseline}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'STATUS'),
              h('p.bold', '{{currentMember.status}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'SOURCE'),
              h('p.bold', '{{currentMember.source}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'GROUP'),
              h('p.bold', '{{currentMember.group}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', 'CLASS'),
              h('p.bold', '{{currentMember.class}}')
            ])
          ])
        ]),

        h('.panel.panel-default', {
          'data-ng-show': "showThis['membershipEdit']",
          'data-ng-keypress': 'messageEnterPress($event)'

        }, [
          h('.panel-heading', [
            h('h5', 'Membership'),
            h('.createCheck.fa.fa-check .editCog', {
              'style': 'color:lightgrey; display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
              'data-ng-click': "showThis['membershipEdit'] = false; updateMember()"
            }),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p', 'ENROLLMENT DATE'),
              h('p.input-group', [
                h('.input .form-control', {
                  'type': 'text',
                  'data-uib-datepicker-popup': '{{format}}',
                  'data-is-open': 'popup.enrollment',
                  'data-min-date': 'minDate',
                  'data-max-date': 'maxDate',
                  'date-datepicker-options': 'dateOptions',
                  'data-date-disabled': 'disabled(date, mode)',
                  'data-ng-required': 'true',
                  'data-close-text': 'Close',
                  'data-ng-model': 'member.enrollmentDate',
                  'style': 'padding:0;'
                }, [
                  h('button .btn .btn-default', {
                    'type': 'button',
                    'data-ng-click': "popup['enrollment'] = true",
                    'style': 'border:none;float:right;'
                  }, [
                    h('i.glyphicon .glyphicon-calendar')
                  ])
                ], "{{currentMember.enrollmentDate | date:'MM/dd/yyyy'}}")
              ])
            ]),
            h('.col-md-6', [
              h('p', 'BASELINE ASSESSMENT'),
              h('p.input-group', [
                h('.input .form-control', {
                  'type': 'text',
                  'data-uib-datepicker-popup': '{{format}}',
                  'data-is-open': 'popup.baseline',
                  'data-min-date': 'minDate',
                  'data-max-date': 'maxDate',
                  'date-datepicker-options': 'dateOptions',
                  'data-date-disabled': 'disabled(date, mode)',
                  'data-ng-required': 'true',
                  'data-close-text': 'Close',
                  'data-ng-model': 'currentMember.baselineAssessment',
                  'style': 'padding:0;'
                }, [
                  h('button .btn .btn-default', {
                    'type': 'button',
                    'data-ng-click': "popup['baseline'] = true",
                    'style': 'border:none;float:right;'
                  }, [
                    h('i.glyphicon .glyphicon-calendar')
                  ])
                ], "{{currentMember.baselineAssessment | date:'MM/dd/yyyy'|| 'set date'}}")
              ])
            ]),
            h('.col-md-6', [
              h('p', 'STATUS'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.status',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'statusVal in statuses'
                }, '{{statusVal}}')
              ])
            ]),
            h('.col-md-6', [
              h('p', 'SOURCE'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.source',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'sourceVal in sourceOptions'
                }, '{{sourceVal}}')
              ])
            ]),
            h('.col-md-6', [
              h('p', 'GROUP'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.group',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'group in groups'
                }, '{{group}}')
              ])
            ]),
            h('.col-md-6', [
              h('p', 'CLASS'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentMember.class',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'class in classOptions'
                }, '{{class}}')
              ])
            ])
          ])
        ])
      ]),
    ])
  ])
}
