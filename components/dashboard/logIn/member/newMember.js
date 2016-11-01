var h = require('hyperscript')
var peopleAddNav = require('../../peopleAddNav.js')

module.exports = {
  url: '/addmembers',
  template: render().outerHTML,
  controller: ['$scope', 'members', 'optionService', 'courses', 'groups', component]
}

function component ($scope, members, optionService, courses, groups) {
  $scope.showPeople = 'members'
  $scope.ethnicities = optionService.get('ethnicities')
  $scope.ages = optionService.get('ages')
  $scope.hospitals = optionService.get('hospitals')
  $scope.physicians = optionService.get('physicians')
  $scope.heights = optionService.get('heights')
  $scope.physicalDates = optionService.get('physicalDates')
  $scope.statuses = optionService.get('statuses')
  $scope.sourceOptions = optionService.get('sourceOptions')
  courses.list().then(function (allCourses) {
    $scope.classOptions = allCourses
  })
  groups.list().then(function (allGroups) {
    $scope.groups = allGroups
  })
  $scope.states = optionService.get('states')
  $scope.days = optionService.get('days')
  $scope.years = optionService.get('years')
  $scope.months = optionService.get('months')
  $scope.popup = {
    enrollment: false,
    baseline: false,
    mostRecentAppt: false
  }
  $scope.member = {
    enrollmentDate: new Date()
  }
  members.list().then(function (allMembers) {
    $scope.allMembers = allMembers
  })
  $scope.setCurrentMember = function (member) {
    store.set('currentMember', member)
  }
  $scope.addNewMember = function (member) {
    var newMember = {}
    newMember = {
      'firstName': member.firstName,
      'lastName': member.lastName,
      'gender': member.gender,
      'dob': member.dob,
      'email': member.email,
      'photo': member.photo,
      'physicalDate': member.physicalDate,
      'health': member.health,
      'physician': member.physician,
      'weight': member.weight,
      'hospital': member.hospital,
      'phoneNumber': member.phoneNumber,
      'address': member.address,
      'zipcode': member.zipcode,
      'state': member.state,
      'city': member.city,
      'source': member.source,
      'status': member.status,
      'appt': '',
      'birthday': member.birthMonth + '/' + member.birthDay + '/' + member.birthYear
    }
    members.create(newMember).then(function (res) {})
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    peopleAddNav,
    h('.fixedContainerShort', [
      h('.col-md-6', [
        h('.panel.panel-default', {
          'style':'padding-bottom:10px;'
        },[
          h('.panel-heading', [
            h('h5', 'General'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'FIRST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.firstName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'LAST NAME'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'BIRTH DATE'),
              h('select#sel1.form-control.inline', {
                'data-ng-model': 'member.birthMonth',
                'required': '',
                'style': 'width:30%;margin-right:5%;'
              }, [
                h('option', {
                  'data-ng-repeat': 'month in months'
                }, '{{month}}')
              ]),
              h('select#sel1.form-control.inline', {
                'data-ng-model': 'member.birthDay',
                'required': '',
                'style': 'width:30%;margin-right:5%;'
              }, [
                h('option', {
                  'data-ng-repeat': 'day in days'
                }, '{{day}}')
              ]),
              h('select#sel1.form-control.inline', {
                'data-ng-model': 'member.birthYear',
                'required': '',
                'style': 'width:30%;'
              }, [
                h('option', {'data-ng-repeat': 'year in years'}, '{{year}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'AGE'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.age',
                'required': ''
              }, [
                h('option', {'data-ng-repeat': 'age in ages'}, '{{age}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'ETHNICITY'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.ethnicity',
                'required': ''
              }, [
                h('option', {'data-ng-repeat': 'ethnicity in ethnicities'}, '{{ethnicity}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'GENDER'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.gender',
                'required': ''
              }, [
                h('option', 'Male'),
                h('option', 'Female')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'HOSPITAL'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.hospital',
                'required': ''
              }, [
                h('option', {'data-ng-repeat': 'hospital in hospitals'}, '{{hospital}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'PHYSICIAN'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.physician',
                'required': ''
              }, [
                h('option', {'data-ng-repeat': 'physician in physicians'}, '{{physician}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'PHOTO'),
              h('input.form-control', {
                'style': 'display:inline-block;',
                'type': 'file'
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'style':'padding-bottom:10px;'
        }, [
          h('.panel-heading', [
            h('h5', 'Measurements'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'WEIGHT'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.weight',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'HEIGHT'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.height',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'height in heights'
                }, '{{height}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'BODY MASS INDEX'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.bmi',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'height in heights'
                }, '{{height}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'SYSTOLIC'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.systolic',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'DIASTOLIC'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.diastolic',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'WAIST (INCHES)'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.waist',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'WAIST TO HIP (INCHES)'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.waistToHip',
                'required': ''
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
                  'data-ng-model': 'member.mostRecentAppt',
                  'style': 'padding:0;'
                }, [
                  h('button .btn .btn-default', {
                    'type': 'button',
                    'data-ng-click': "popup['mostRecentAppt'] = true",
                    'style': 'border:none;float:right;'
                  }, [
                    h('i.glyphicon .glyphicon-calendar')
                  ])
                ], "{{member.mostRecentAppt | date:'MM/dd/yyyy'|| 'set date'}}")
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'LAST COMPLETE PHYSICAL'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.physicalDate',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'physicalDate in physicalDates'
                }, '{{physicalDate}}')
              ])
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'style':'padding-bottom: 10px;d'
        }, [
          h('.panel-heading', [
            h('h5', 'Contact'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'ADDRESS'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.address',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'CITY'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.city',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'STATE'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.state',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'state in states'
                }, '{{state}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'ZIP CODE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.zipCode',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.phone',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'EMAIL'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.email',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'EMERGENCY PHONE'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'member.emergencyPhone',
                'required': ''
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'style':'padding-bottom:10px;'
        }, [
          h('.panel-heading', [
            h('h5', 'Membership'),
          ]),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'ENROLLMENT DATE'),
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
                ], "{{member.enrollmentDate | date:'MM/dd/yyyy'}}")
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'BASELINE ASSESSMENT DATE'),
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
                  'data-ng-model': 'member.baselineAssessment',
                  'style': 'padding:0;'
                }, [
                  h('button .btn .btn-default', {
                    'type': 'button',
                    'data-ng-click': "popup['baseline'] = true",
                    'style': 'border:none;float:right;'
                  }, [
                    h('i.glyphicon .glyphicon-calendar')
                  ])
                ], "{{member.baselineAssessment | date:'MM/dd/yyyy'|| 'set date'}}")
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'STATUS'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.status',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'statusVal in statuses'
                }, '{{statusVal}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'SOURCE'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.source',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'sourceVal in sourceOptions'
                }, '{{sourceVal}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'GROUP'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.group',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'group in groups'
                }, '{{group}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'CLASS'),
              h('select#sel1.form-control', {
                'data-ng-model': 'member.class',
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
      h('.right.col-md-6', [
        h('br'),
        h('button.btn.btn-info', {
          'data-ng-click': 'addNewMember(member); setCurrentMember(member)',
          'data-ui-sref': 'metrics({member_id : member._id})',
          'style': 'width:140px; padding:10px'
        }, 'Add Participant'),
        h('button.btn.btn-danger', {
          'data-ng-click': '',
          'style': 'margin-left:20px;width:140px; padding:10px'
        }, 'Cancel')
      ])
    ])
  ])
}
