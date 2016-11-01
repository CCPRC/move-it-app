var h = require('hyperscript')

module.exports = function () {
  return h('div.modal-content', [
    h('div.modal-header', {
      'style': 'border-bottom:none;'
    }, [
      // h('button.close', {
      //   'type': 'button',
      //   'data-target': '#myModal',
      //   'data-ng-click': 'appear = !appear',
      //   'data-dismiss': 'modal',
      //   'aria-label': 'Close'
      // }, [
      //   h('span', {
      //     'aria-hidden': 'true'
      //   }, [ '×' ])
      // ]),
      h('h4#myModalLabel.modal-title.inline', [ 'New Note' ]),
      h('h4.inline', {
        'style': 'float:right;margin-right: 12px;'
      }, "{{myTime | date: 'hh:mm'}} , {{memberNote.date || currentDate | date: 'MM/dd/yyyy'}}")
    ]),
    h('div', [
      h('div.col-md-12', {
        'data-ng-show': "time['custom']"
      }, [
        h('div', {
          'style': 'margin-top:2px;width:30%;display:inline-block;float:left'
        }, [
          h('h6', 'TIME'),
          h('uib-timepicker', {
            'data-ng-model': '$parent.myTime',
            'data-ng-change': 'changed()',
            'data-hour-step': 'hstep',
            'data-minute-step': 'mstep',
            'data-show-meridian': 'ismeridian'
          })
        ]),
        h('p.input-group', [
          h('h6', 'DATE'),
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
            'data-ng-model': 'memberNote.date',
            'style': 'padding:0;padding-left:10px;line-height:30px;width: 45%;display:inline-block'
          }, [
            h('button .btn .btn-default', {
              'type': 'button',
              'data-ng-click': "popup['date'] = true",
              'style': 'border:none;float:right;'
            }, [
              h('i.glyphicon .glyphicon-calendar')
            ])
          ], "{{memberNote.date || currentDate | date: 'MM/dd/yyyy'}}")
        ]),
        h('p', {'data-ng-click': "time['custom'] = false; resetCurrentTime()" }, 'use current time and date')
      ]),
      h('div.col-md-12', {'data-ng-hide': "time['custom']"}, [
        h('p', {
          'data-ng-click': "time['custom'] = true;", 'style': 'float:right;width: 136px;margin-top: 10px;'
        }, 'input custom time')
      ]),

      h('div.col-md-12', [
        h('p', {'style': 'padding-top:15px;'}, ['MESSAGE']),
        h('textarea.form-control', {
          'style': 'width: 100%; padding-bottom:10px;',
          'rows': '10',
          'cols': '50',
          'data-ng-model': 'memberNote.message',
          'required': ''
        })
      ])
    ]),
    h('div.modal-footer', [
      h('div.col-md-12', {
        'style': 'margin: 35px 0px 0px 0px'
      }, [
        // h('button.btn.btn-default', {
        //   'type': 'button',
        //   'data-ng-click': 'appear = !appear',
        //   'data-dismiss': 'modal'
        // }, 'Close'),
        h('button.btn.btn-primary', {
          'type': 'button',
          'data-ng-click': 'addNewNote()'
        }, 'Add Note')
      ])
    ])
  ])
}