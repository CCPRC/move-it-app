var h = require('hyperscript')
var topNav = require('./topNav.js')
var notesModal = require('./notesModal')

module.exports = {
  url: '/notes',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'members', 'notes', 'stats', '$stateParams', 'optionService', 'store', '$uibModal', component]
}

function component ($scope, $state, members, notes, stats, $stateParams, optionService, store, $uibModal) {
  $scope.page = 'notes'
  // notes.get('363409ecdc9e546b4096054654190dd0').then(function (memberNotes) {
  //   console.log(memberNotes, "han's notes")
  // })
  $scope.statusOptions = optionService.get('status')
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
    console.log($scope.currentMember)
    notes.get($scope.currentMember._id).then(function (memberNotes) {
      $scope.memberNotes = memberNotes
      console.log('memberNotes', $scope.memberNotes)
    })
  }
  $scope.time = {
    custom: false
  }
  $scope.memberNote = {
    'message': ''
  }
  $scope.addNewNote = function () {
    var newNote = {}
    newNote = {
      date: Date.now(),
      message: $scope.memberNote.message,
      type: 'note',
      parent_id: $scope.currentMember._id
    }

    notes.create(newNote).then(function (res) {
      $state.reload()
    })
  }
  $scope.popup = {
    date: false
  }
  $scope.currentDate = new Date()
  $scope.hourOptions = optionService.get('hours')
  $scope.minOptions = optionService.get('minutes')
  $scope.myTime = new Date()
  $scope.resetCurrentTime = function () {
    $scope.myTime = new Date()
  }
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

  $scope.$watch('myTime', function () {
    console.log('time', $scope.myTime)
  })
  $scope.updateMember = function () {
    members.update($scope.currentMember).then(function (res) {
    })
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
  $scope.openNotesModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: notesModal().outerHTML,
      scope: $scope
    });
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    topNav,
    h('.fixedContainer', [
      h('dv.col-md-12', [
        h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
          'style': 'background-color:#ededed; border: 2px dotted #D3D3D3; display: flex; justify-content: center; padding: 26px;',
          'data-ng-click': 'openNotesModal()'
        }, [
          h('div', {
            'style': 'cursor:pointer',
            'data-target': '#myModal'
          }, [
            h('h5.inline', ' +'),
            h('h5.inline.medGreyTxt', {
              'style': 'margin-left:10px;'
            }, 'Add New Note')
          ])
        ]),
        // h('div.row', [
        //   h('div.col-md-12', [
        //     h('div.panel.panel-default', [
        //       h('div.panel-body', [
        //         h('a', {
        //           'data-ng-click': 'appear = !appear',
        //           'data-target': '#myModal'
        //         }, [
        //           h('h5', '  + Add New Note')
        //         ])
        //       ])
        //     ])
        //   ])
        // ]),
        h('div.row', {
          'data-ng-repeat': 'note in memberNotes'
        }, [
          h('div.col-md-12', [
            h('div.panel.panel-default', [
              h('div.panel-body', [
                h('h5', '{{note.date}}'),
                h('p', {
                  'style': 'color:lightgrey;'
                }, [ '10:30 AM' ]),
                h('br'),
                h('p', '{{note.doc.message | limitTo: 140}}')
              ])
            ])
          ])
        ])
      ]),
      //   h('div.row', [
      //     h('div.col-md-12', [
      //       h('div.panel.panel-default', [
      //         h('div.panel-body', [
      //           h('h5', [ 'December 14, 2015' ]),
      //           h('p', {
      //             'style': 'color:lightgrey;'
      //           }, [ '10:30 AM' ]),
      //           h('br'),
      //           h('p', [ 'Called and left voicemail. Member class schedule has been changed.' ])
      //         ])
      //       ])
      //     ])
      //   ]),
      //
      //   h('div.row', [
      //     h('div.col-md-12', [
      //       h('div.panel.panel-default', [
      //         h('div.panel-body', [
      //           h('h5', [ 'December 21, 2015' ]),
      //           h('p', {
      //             'style': 'color:lightgrey;'
      //           }, [ '12:30 PM' ]),
      //           h('br'),
      //           h('p', [ 'Called and left voicemail. Rescheduled assessment.' ])
      //         ])
      //       ])
      //     ])
      //   ])
      // ]),

      // h('#myModal', {
      //   'data-ng-show': 'appear',
      //   'style': 'position:fixed; z-index:10; top:0; bottom:0; max-width:100%; margin-top:150px; margin-left: 210px',
      //   'tabindex': '-1',
      //   'rol': 'dialog',
      //   'aria-labelledby': 'myModalLabel'
      // }, [
      //   h('div.modal-content', [
      //     h('div.modal-header', {
      //       'style': 'border-bottom:none;'
      //     }, [
      //       h('button.close', {
      //         'type': 'button',
      //         'data-target': '#myModal',
      //         'data-ng-click': 'appear = !appear',
      //         'data-dismiss': 'modal',
      //         'aria-label': 'Close'
      //       }, [
      //         h('span', {
      //           'aria-hidden': 'true'
      //         }, [ '×' ])
      //       ]),
      //       h('h4#myModalLabel.modal-title.inline', [ 'New Note' ]),
      //       h('h4.inline', {
      //         'style': 'float:right;margin-right: 12px;'
      //       }, "{{course.hour || currentHour}} : {{course.min || currentMin}} {{course.amPm || currentPeriod}} , {{memberNote.date || currentDate | date: 'MM/dd/yyyy'}}")
      //     ]),
      //     h('div', [
      //       h('div.col-md-12', {
      //         'data-ng-show': "time['custom']"
      //       }, [
      //         h('div', {
      //           'style': 'margin-top:2px;width:30%;display:inline-block;float:left'
      //         }, [
      //           h('h6', 'TIME'),
      //           h('uib-timepicker', {
      //             'data-ng-model': '$parent.myTime',
      //             'data-ng-change': 'changed()',
      //             'data-hour-step': 'hstep',
      //             'data-minute-step': 'mstep',
      //             'data-show-meridian': 'ismeridian'
      //           })
      //         ]),
      //         h('p.input-group', [
      //           h('h6', 'DATE'),
      //           h('.input .form-control', {
      //             'type': 'text',
      //             'data-uib-datepicker-popup': '{{format}}',
      //             'data-is-open': 'popup.date',
      //             'data-min-date': 'minDate',
      //             'data-max-date': 'maxDate',
      //             'date-datepicker-options': 'dateOptions',
      //             'data-date-disabled': 'disabled(date, mode)',
      //             'data-ng-required': 'true',
      //             'data-close-text': 'Close',
      //             'data-ng-model': 'memberNote.date',
      //             'style': 'padding:0;padding-left:10px;line-height:30px;width: 45%;display:inline-block'
      //           }, [
      //             h('button .btn .btn-default', {
      //               'type': 'button',
      //               'data-ng-click': "popup['date'] = true",
      //               'style': 'border:none;float:right;'
      //             }, [
      //               h('i.glyphicon .glyphicon-calendar')
      //             ])
      //           ], "{{memberNote.date || currentDate | date: 'MM/dd/yyyy'}}")
      //         ]),
      //         h('p', {'data-ng-click': "time['custom'] = false"}, 'use current time and date')
      //       ]),
      //       h('div.col-md-12', {'data-ng-hide': "time['custom']"}, [
      //         h('p', {
      //           'data-ng-click': "time['custom'] = true;", 'style': 'float:right;width: 136px;margin-top: 10px;'
      //         }, 'input custom time')
      //       ]),
      //
      //       h('div.col-md-12', [
      //         h('p', {'style': 'padding-top:15px;'}, ['MESSAGE']),
      //         h('textarea.form-control', {
      //           'style': 'width: 100%; padding-bottom:10px;',
      //           'rows': '10',
      //           'cols': '50',
      //           'data-ng-model': 'memberNote.message',
      //           'required': ''
      //         })
      //       ])
      //     ]),
      //     h('div.modal-footer', [
      //       h('div.col-md-12', {
      //         'style': 'margin: 35px 0px 0px 0px'
      //       }, [
      //         h('button.btn.btn-default', {
      //           'type': 'button',
      //           'data-ng-click': 'appear = !appear',
      //           'data-dismiss': 'modal'
      //         }, 'Close'),
      //         h('button.btn.btn-primary', {
      //           'type': 'button',
      //           'data-ng-click': 'addNewNote()'
      //         }, 'Add Note')
      //       ])
      //     ])
      //   ])
      // ])
    ])
  ])
}
