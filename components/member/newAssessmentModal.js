var h = require('hyperscript')

module.exports = function () {
  return h('div.modal-content', [
    h('div.modal-header', [
      // h('button.close', {
      //   'type': 'button',
      //   'data-ng-click':'cancel()'
      // }, [
      //   h('span', {
      //     'aria-hidden': 'true'
      //   }, '×')
      // ]),
      h('h4#myModalLabel.modal-title', 'New Assessment')
    ]),
    h('form', [
      h('div', [
        h('.col-md-6.courseInfo', [
          h('br'),
          h('p.formP', 'LOCATION'),
          h('input.form-control', {
            'type': 'text',
            'data-ng-model': 'memberAssessment.locationVal',
            'required': ''
          })
        ]),
        h('.col-md-6.courseInfo', [
          h('br'),
          h('p.formP', 'CLASS'),
          h('select.form-control', {
            'id': 'classControl',
            'data-ng-model': 'memberAssessment.class'
          }, [
            h('option', {
              'data-ng-repeat': 'class in classOptions'
            }, '{{class.courseName}}')
          ])
        ]),
        h('.col-md-4.col-xs-6.courseInfo', [
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
              'data-ng-model': 'memberAssessment.date',
              'style': 'padding:0;padding-left:10px;line-height:30px;margin-top:34px;'
            }, [
              h('button .btn .btn-default', {
                'type': 'button',
                'data-ng-click': "popup['date'] = true",
                'style': 'border:none;float:right;height:100%;'
              }, [
                h('i.glyphicon .glyphicon-calendar')
              ])
            ], "{{memberAssessment.date | date:'MM/dd/yyyy'|| 'set date'}}")
          ])
        ]),
        h('.col-md-8.col-xs-6.courseInfo', [
          h('p.formP', 'TIME'),
          h('uib-timepicker', {
            'data-ng-model': 'mytime',
            'data-hour-step': 'hstep',
            'data-minute-step': 'mstep',
            'data-show-meridian': 'ismeridian'
          })
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'TRAINER'),
          h('select.form-control', {
            'id': 'trainerControl',
            'data-ng-model': 'memberAssessment.trainer'
          }, [
            h('option', {
              'data-ng-repeat': 'trainer in allTrainers'
            }, '{{trainer.firstName}} {{trainer.lastName}}')
          ])
        ])
      ]),
      h('div', [
        h('.col-md-6.courseInfo', [
          h('p.formP', 'SIX MINUTE WALK'),
          h('input.form-control', {
            'type': 'text',
            'data-ng-model': 'memberAssessment.sixMinWalk'
          })
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'CHAIR STAND TEST'),
          h('div', {
            'style': 'display:inline-block;'
          }, [
            h('p', {
              'style': 'display:inline-block;'
            }, '1.'),
            h('input.form-control', {
              'style': 'width:25%;margin-right:5px;display:inline-block;',
              'type': 'number',
              'min': '0',
              'data-ng-model': 'memberAssessment.chairTest1'
            }),
            h('p', {
              'style': 'display:inline-block;'
            }, 'inches')
          ]),
          h('div', {
            'style': 'display:inline-block;'
          }, [
            h('p', {
              'style': 'display:inline-block;'
            }, '2.'),
            h('input.form-control', {
              'style': 'width:25%;margin-right:5px;display:inline-block;',
              'type': 'number',
              'min': '0',
              'data-ng-model': 'memberAssessment.chairTest2'
            }),
            h('p', {
              'style': 'display:inline-block;'
            }, 'inches')
          ])
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'EIGHT FOOT UP AND GO'),
          h('div', {
            'style': 'display:inline-block;'
          }, [
            h('p', {
              'style': 'display:inline-block;'
            }, '1.'),
            h('input.form-control', {
              'style': 'width:25%; margin-right:5px;display:inline-block;',
              'type': 'number',
              'min': '0',
              'data-ng-model': 'memberAssessment.eightFoot1'
            }),
            h('p', {
              'style': 'display:inline-block;'
            }, 'inches')
          ]),
          h('div', {
            'style': 'display:inline-block;'
          }, [
            h('p', {
              'style': 'display:inline-block;'
            }, '2.'),
            h('input.form-control', {
              'style': 'display:inline-block;margin-right:5px;width:25%;',
              'type': 'number',
              'min': '0',
              'data-ng-model': 'memberAssessment.eightFoot2'
            }),
            h('p', {
              'style': 'display:inline-block;'
            }, 'inches')
          ])
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'TURN TEST 360 RIGHT'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'style':'width:80%;margin-right:5px;display:inline-block',
            'data-ng-model': 'memberAssessment.turnRight'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'steps')
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'TURN TEST 360 LEFT'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'style':'width:80%;margin-right:5px;display:inline-block',
            'data-ng-model': 'memberAssessment.turnLeft'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'steps')
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'STAND ON ONE LEG'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'style':'width:80%;margin-right:5px;display:inline-block',
            'data-ng-model': 'memberAssessment.oneLeg'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'steps')
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'ARM CURL'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'style':'width:80%;margin-right:5px;display:inline-block',
            'data-ng-model': 'memberAssessment.armCurl'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'in 30 seconds')
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'HEIGHT'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'max': '9',
            'style':'width:25%;margin-right:5px;display:inline-block',
            'data-ng-model': 'memberAssessment.heightFt'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'ft'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'max': '11',
            'style':'width:25%;margin-right:5px;display:inline-block',
            'data-ng-model': 'memberAssessment.heightIn'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'in')
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'WEIGHT'),
          h('input.form-control', {
            'type': 'number',
            'style':'width:80%;margin-right:5px;display:inline-block',
            'max': '500',
            'min': '1',
            'data-ng-model': 'memberAssessment.weight'
          }),
          h('p', {
            'style': 'display:inline-block;'
          }, 'lbs')
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'SYSTOLIC'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'data-ng-model': 'memberAssessment.systolic'
          })
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'DIASTOLIC'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'data-ng-model': 'memberAssessment.diastolic'
          })
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'WAIST CIRCUMFERENCE'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'data-ng-model': 'memberAssessment.waistCirc'
          })
        ]),
        h('.col-md-6.courseInfo', [
          h('p.formP', 'HIP CIRCUMFERENCE'),
          h('input.form-control', {
            'type': 'number',
            'min': '0',
            'data-ng-model': 'memberAssessment.hipCirc'
          })
        ])
      ])
    ]),
    h('.modal-footer', [
      h('.col-md-8', {
        'style': 'margin: 35px 0px 0px 0px'
      }, [
        // h('.lincBtn.btn-danger', {
        //   'type': 'button',
        //   'data-ng-click': 'appear = !appear',
        //   'data-dismiss': 'modal',
        //   'style': 'float: left;margin-right: 20px;'
        // }, 'Close'),
        h('.lincBtn', {
          'type': 'button',
          'data-ng-click': 'addNewAssessment(memberAssessment)',
          'style': 'float: left;'
        }, 'Add')
      ])
    ])
  ])
}
