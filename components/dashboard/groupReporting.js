var h = require('hyperscript')

module.exports = function () {
  return h('.col-md-12', {
    'data-ng-show': "view === 'group'"
  }, [
    h('.panel.panel-default.reportCard', [
      h('.panel-heading', [
        h('h5', {
          'style': 'display:inline-block;float:left;'
        }, 'New Group Report')
      ]),
      h('.panel-body', {
        'style': 'padding: 25px;'
      }, [
        h('.col-md-6', [
          h('p.formP', 'GROUP'),
          h('select#sel1.form-control', {
            'data-ng-model': 'groupReport.group',
            'data-ng-options': 'group as group.groupName for group in allGroups',
            'required': ''
          })
        ]),
        h('.col-md-12', [
          h('label.formP', 'METRICS'),
          h('br'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('armCurl')"
            })
          ], 'Arm Curl'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('chairTest')"
            })
          ], 'Chair Test'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('sixMinWalk')"
            })
          ], 'Six Minute Walk'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('eightFoot')"
            })
          ], 'Eight Foot'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('turns')"
            })
          ], 'Turns'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('weight')"
            })
          ], 'Weight'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('diastolic')"
            })
          ], 'Diastolic'),
          h('label.checkbox-inline', [
            h('input', {
              'type': 'checkbox',
              'data-ng-click': "selectMetric('systolic')"
            })
          ], 'Systolic')
        ]),
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
              'data-ng-model': 'groupReport.startDate',
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
            ], "{{groupReport.startDate | date:'MM/dd/yyyy'}}")
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
              'data-ng-model': 'groupReport.endDate',
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
            ], "{{groupReport.endDate | date:'MM/dd/yyyy'}}")
          ])
        ]),
        h('.reportTypeButtonRow.col-md-12', {
          'style': 'margin-top:40px;'
        }, [
          h('.col-md-6.col-xs-6', [
            h('.reportTypeButtonCancel.col-md-12', {
              'data-ng-click': "view = 'new'; clearReport()"
            }, 'Cancel'),
          ]),
          h('.col-md-6.col-xs-6', [
            h('.reportTypeButton.col-md-12', {
              'data-ng-click': "generateGroupReport()"
            }, 'Generate Report')
          ])
        ]),
        h('.reportTypeButtonRow.col-md-12', {
          'style': 'margin-top:40px;'
        }, [
          h('.col-md-6.col-xs-6', [
            h('.col-md-12.reportPrintButton', {
              'data-ng-if': 'linechartdata.length > 1',
              'data-ng-click': 'addNewReport()'
            }, 'SAVE REPORT'),
          ]),
          h('.col-md-6.col-xs-6', [
            h('.col-md-12.reportPrintButton', {
              'data-ng-if': 'linechartdata.length > 1',
              'data-ng-click': 'showDetailReport()'
            }, 'PRINT / DOWNLOAD')
          ])
        ])
      ])
    ])
  ])
}
