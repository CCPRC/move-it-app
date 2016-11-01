var h = require('hyperscript')

module.exports = function () {
  return h('div.modal-content', [
    h('div.modal-header', [
      h('h4', 'Update Course')
    ]),
    h('.col-md-12.col-xs-12', [
      h('.col-md-4', [
        h('.form-group', [
          h('p.formP', 'NAME'),
          h('input.form-control', {
            'id': 'name',
            'type': 'text',
            'data-ng-model': 'currentCourse.courseName',
            'required': ''
          })
        ])
      ]),
      h('.col-md-4', [
        h('p.formP', 'CODE'),
        h('input.form-control', {
          'id': 'code',
          'type': 'text',
          'data-ng-model': 'currentCourse.courseCode',
          'required': ''
        })
      ]),
      h('.col-md-4', [
        h('p.formP', 'ADDRESS'),
        h('input.form-control', {
          'id': 'address',
          'type': 'text',
          'data-ng-model': 'currentCourse.address',
          'required': ''
        })
      ])
    ]),
    h('.col-md-4.col-xs-4', [
      h('.form-group', [
        h('p.formP', 'DURATION'),
        h('select.form-control', {
          'id': 'repeat',
          'data-ng-model': 'currentCourse.duration'
        }, [
          h('option', {
            'data-ng-repeat': 'duration in durationOptions'
          }, '{{duration}}')
        ])
      ])
    ]),
    h('.col-md-8.col-xs-8.courseInfo', [
      h('p.formP', 'TIME'),
      h('uib-timepicker', {
        'data-ng-model': 'mytime',
        'data-hour-step': 'hstep',
        'data-minute-step': 'mstep',
        'data-show-meridian': 'ismeridian'
      })
    ]),
    h('.col-md-12', {
      'style': 'clear:both;'
    }, [
      h('p.formP.col-md-12', 'ON DAYS'),
        h('.col-md-12', [
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'sun',
            'data-ng-model': 'currentCourse.onDays.sund',
            'data-ng-init': 'currentCourse.onDays.sund === false'
          })
        ], 'Sun'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'mon',
            'data-ng-model': 'currentCourse.onDays.mon',
            'data-ng-init': 'currentCourse.onDays.mon === false'
          })
        ], 'Mon'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'tues',
            'data-ng-model': 'currentCourse.onDays.tues',
            'data-ng-init': 'currentCourse.onDays.tues === false'
          })
        ], 'Tue'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'wed',
            'data-ng-model': 'currentCourse.onDays.wed',
            'data-ng-init': 'currentCourse.onDays.wed === false'
          })
        ], 'Wed'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'thu',
            'data-ng-model': 'currentCourse.onDays.thu',
            'data-ng-init': 'currentCourse.onDays.thu === false'
          })
        ], 'Thu'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'fri',
            'data-ng-model': 'currentCourse.onDays.fri',
            'data-ng-init': 'currentCourse.onDays.fri === false'
          })
        ], 'Fri'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'sat',
            'data-ng-model': 'currentCourse.onDays.sat',
            'data-ng-init': 'currentCourse.onDays.sat === false'
          })
        ], 'Sat')
      ])
    ]),
    h('.col-md-12', [
      h('.form-group.col-md-6', [
        h('p.formP', 'START DATE'),
        h('.optBox', {
          'style': 'margin-bottom: -13px; margin-left: 0;width:100%;'
        }, [
          h('.input .form-control', {
            'type': 'text',
            'data-uib-datepicker-popup': '{{format}}',
            'data-is-open': 'popup.startDate',
            'data-min-date': 'minDate',
            'data-max-date': 'maxDate',
            'date-datepicker-options': 'dateOptions',
            'data-date-disabled': 'disabled(date, mode)',
            'data-ng-required': 'true',
            'data-close-text': 'Close',
            'data-ng-model': 'currentCourse.startDate',
            'data-ng-click': 'repeatValue(on)',
            'style': 'padding:0;padding-left:10px;line-height:30px;'
          }, [
            h('button .btn .btn-default', {
              'type': 'button',
              'data-ng-click': "popup['startDate'] = true",
              'style': 'border:none;float:right;'
            }, [
              h('i.glyphicon .glyphicon-calendar')
            ])
          ], "{{currentCourse.startDate | date:'MM/dd/yyyy'}}")
        ])
      ]),
      h('.form-group.col-md-6', [
        h('p.formP', 'END DATE'),
        h('.optBox', {
          'style': 'margin-bottom: -13px; margin-left: 0;width:100%;'
        }, [
          h('.input .form-control', {
            'type': 'text',
            'data-uib-datepicker-popup': '{{format}}',
            'data-is-open': 'popup.endDate',
            'data-min-date': 'minDate',
            'data-max-date': 'maxDate',
            'date-datepicker-options': 'dateOptions',
            'data-date-disabled': 'disabled(date, mode)',
            'data-ng-required': 'true',
            'data-close-text': 'Close',
            'data-ng-model': 'currentCourse.ndDate',
            'data-ng-click': 'repeatValue(on)',
            'style': 'padding:0;padding-left:10px;line-height:30px;'
          }, [
            h('button .btn .btn-default', {
              'type': 'button',
              'data-ng-click': "popup['endDate'] = true",
              'style': 'border:none;float:right;'
            }, [
              h('i.glyphicon .glyphicon-calendar')
            ])
          ], "{{currentCourse.ndDate | date:'MM/dd/yyyy'}}")
        ])
      ]),
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12', [
      h('.col-md-4', [
        h('.form-group', [
          h('p.formP', 'PROGRAM'),
          h('select.form-control', {
            'data-ng-model': 'currentCourse.program'
          }, [
            h('option', {
              'data-ng-repeat': 'programVal in programOptions'
            }, '{{programVal}}')
          ])
        ])
      ]),
      h('.col-md-4', [
        h('p.formP', 'TRAINER'),
        h('select.form-control', {
          'id': 'code',
          'type': 'text',
          'data-ng-model': 'currentCourse.trainer'
        }, [
          h('option', {
            'data-ng-repeat': 'trainerVal in trainerOptions'
          }, '{{trainerVal.firstName}} {{trainerVal.lastName}}')
        ])
      ]),
      h('.col-md-4', [

        h('p.formP', 'MAX. NUMBER OF PARTICIPANTS'),
        h('input.form-control', {
          'id': '',
          'type': 'number',
          'min': '0',
          'data-ng-model': 'currentCourse.maxMembers',
          'placeholder': '{{currentCourse.courseMax}}'
        })
      ])
    ]),
    h('.col-md-12.col-xs-12', [
      h('.col-md-4', [
        h('.form-group', [
          h('p.formP', 'CATEGORY'),
          h('select.form-control', {
            'data-ng-model': 'currentCourse.category'
          }, [
            h('option', {
              'data-ng-repeat': 'category in categories'
            }, '{{category}}')
          ])
        ])
      ])
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12#participantEdit.col-md-12', {
      'style': 'padding-bottom: 20px;'
    }, [
      h('.col-md-6', [
        h('h4', 'All People'),
        h('div.participants#participants.container', {
          'style': 'width:100%;'
        }, [
          h('div.personBlock', {
            'data-ng-repeat': "person in allPeople",
            'style': 'background-color:white;'
          }, [
            h('.col-md-2.col-xs-2.groupMemberAvatar', [
              h('img.participantAvatar', {
                'data-ng-src': "{{person.avatar || 'img/images.png'}}",
                'style': 'border-radius:100%;max-width:100%;max-height:40px;'
              }),
            ]),
            h('col-md-8.col-xs-8.groupMemberName', '{{person.firstName}} {{person.lastName}}'),
            h('col-md-2.col-xs-2.groupMemberAddButton', [
              h('.createPlus.fa.fa-plus-square', {
                'style': 'float:right;line-height:50px;',
                'data-ng-click': 'addCurrentCourseParticipant(person)'
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('h4', 'Attendance'),
        h('div.participants#participants.container', {
          'style': 'width:100%;'
        }, [
          h('div.personBlock', {
            'data-ng-repeat': "participant in currentCourse.attendance",
            'style': 'background-color:white;'
          }, [
            h('.col-md-2.col-xs-2.groupMemberAvatar', [
              h('img.participantAvatar', {
                'data-ng-src': "{{participant.avatar || 'img/images.png'}}",
                'style': 'border-radius:100%;max-width:100%;max-height:40px;'
              }),
            ]),
            h('col-md-8.col-xs-8.groupMemberName', '{{participant.firstName}} {{participant.lastName}}'),
            h('col-md-2.col-xs-2.groupMemberAddButton', [
              h('.createX.fa.fa-minus-square', {
                'style': 'float:right;line-height:50px;',
                'data-ng-click': 'removeCurrentCourseParticipant(participant)'
              })
            ])
          ])
        ])
      ])
    ]),
    h('hr'),
    h('fifthRow', [
      h('button.btn.btn-danger', {
        'style': 'margin:10px;padding:10px; width:150px; text-align:center; position:middle;',
        'data-ng-click': "deleteCourse()"
      }, 'Delete Course'),
      h('button.btn.btn-info', {
        'data-ng-click': 'updateCurrentCourse()',
        'style': 'margin:10px; padding:10px; width:150px; text-align:center; position:middle;'
      }, 'Save Update')
    ])
  ])
}
