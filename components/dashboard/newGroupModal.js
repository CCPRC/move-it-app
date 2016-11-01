var h = require('hyperscript')

module.exports = function () {
  return h('div.modal-content', [
    h('div.modal-header', [
      h('h4', 'New Group')
    ]),
    h('.col-md-12.col-xs-12', [
      h('.col-md-12', [
        h('.form-group', [
          h('p.formP', 'GROUP NAME'),
          h('input.form-control', {
            'id': 'name',
            'type': 'text',
            'required': '',
            'data-ng-model': 'groupName'
          })
        ])
      ])
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12', [
      h('.col-md-8', [
        h('p.formP', 'AGE'),
        h('.flexContainer', {
          'style': 'display:flex; justify-content: space-between'
        }, [
          h('input.form-control', {
            'style': 'width:25%;margin:5px;display:inline-block;',
            'type': 'number',
            'min': '0',
            'data-ng-model': 'filter.ageStart'
          }),
          h('p', 'to'),
          h('input.form-control', {
            'style': 'width:25%;margin:5px;display:inline-block;',
            'type': 'number',
            'min': '0',
            'data-ng-model': 'filter.ageEnd'
          })
        ])
      ]),
      h('.col-md-4', [
        h('p.formP', 'ALL AGES'),
        h('label.checkbox-inline', [
          h('input', {
            'type': 'checkbox',
            'name': 'allAge',
            'data-ng-model': 'filter.allAge'
          })
        ], 'All')
      ])
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12', [
      h('.col-md-4.col-xs-4', [
        h('p.formP', 'GENDER'),
        h('select#sel1.form-control', {
          'data-ng-model': 'filter.gender',
          'required': ''
        }, [
          h('option', 'all'),
          h('option', 'Male'),
          h('option', 'Female')
        ])
      ]),
      h('.col-md-4.col-xs-4', [
        h('p.formP', 'ETHNICITY'),
        h('select#sel1.form-control', {
          'data-ng-model': 'filter.ethnicity',
          'required': ''
        }, [
          h('option', 'all'),
          h('option', {'data-ng-repeat': 'ethnicity in ethnicities'}, '{{ethnicity}}')
        ])
      ]),
      h('.col-md-4.col-xs-4', [
        h('p.formP', 'ZIP CODE'),
        h('input.form-control', {
          'type': 'text',
          'data-ng-model': 'filter.zipcode'
        })
      ])
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12', [
      h('.col-md-4', [
        h('p.formP', 'STATUS'),
        h('select#sel1.form-control', {
          'data-ng-model': 'filter.status'
        }, [
          h('option', 'all'),
          h('option', {
            'data-ng-repeat': 'statusVal in statuses'
          }, '{{statusVal}}')
        ])
      ]),
      h('.col-md-4', [
        h('p.formP', 'HOSPITAL'),
        h('select#sel1.form-control', {
          'data-ng-model': 'filter.hospital'
        }, [
          h('option', 'all'),
          h('option', {
            'data-ng-repeat': 'hospitalVal in hospitals'
          }, '{{hospitalVal}}')
        ])
      ]),
      h('.col-md-4', [
        h('p.formP', 'PHYSICIAN'),
        h('select#sel1.form-control', {
          'data-ng-model': 'filter.physician'
        }, [
          h('option', 'all'),
          h('option', {
            'data-ng-repeat': 'physicianVal in physicians'
          }, '{{physicianVal}}')
        ])
      ])
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12#participantEdit', {
      'style': 'padding-bottom: 20px;'
    }, [
      h('.col-md-6', [
        h('h4', 'Participants'),
        h('div.participants#participants.container', {
          'style': 'width:100%;'
        }, [
          h('h4.medGreyTxt', {
            'data-ng-hide': 'groupMembers.length > 0',
            'style': 'text-align:center;'
          }, 'Add Participants from All People'),
          h('div.personBlock', {
            'data-ng-repeat': "member in groupMembers | ethnicity: filter | gender: filter | hospital: filter | age:filter | zipcode:filter | status: filter",
            'style': 'background-color:white;'
          }, [
            h('.col-md-2.col-xs-2.groupMemberAvatar', [
              h('img.participantAvatar', {
                'data-ng-src': "{{member.avatar || 'img/images.png'}}",
                'style': 'border-radius:100%;width:70%;'
              }),
            ]),
            h('col-md-8.col-xs-8.groupMemberName', '{{member.firstName}} {{member.lastName}}'),
            h('col-md-2.col-xs-2.groupMemberAddButton', [
              h('.createX.fa.fa-minus-square', {
                'style': 'float:right;line-height:50px;',
                'data-ng-click': 'removeParticipant(member)'
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('h4', 'All People'),
        h('div.listOfPeople#listOfPeople.container', {
          'style': 'width:100%;'
        }, [
          h('div.personBlock', {
            'data-ng-repeat': "person in allPeople | ethnicity: filter | gender: filter | hospital: filter | age:filter | zipcode:filter | status: filter",
            'style': 'background-color:white;'
          }, [
            h('.col-md-2.col-xs-2.personAvatar', [
              h('img.participantAvatar', {
                'data-ng-src': "{{person.avatar || 'img/images.png'}}",
                'style': 'border-radius:100%;width:70%;'
              }),
            ]),
            h('col-md-8.col-xs-8.groupMemberName', '{{person.firstName}} {{person.lastName}}'),
            h('col-md-2.col-xs-2.groupMemberAddButton', [
              h('.createPlus.fa.fa-plus-square', {
                'style': 'float:right;line-height:50px;',
                'data-ng-click': 'addParticipant(person)'
              })
            ])
          ])
        ])
      ])
    ]),
    h('hr'),
    h('fifthRow', [
      // h('button.btn.btn-danger', {
      //   'href': '#/navigator',
      //   'style': 'margin:10px;padding:10px; width:150px; text-align:center; position:middle;',
      //   'data-ng-click': "newClassModal['show'] = false"
      // }, 'Cancel'),
      h('button.btn.btn-info', {
        'data-ng-click': 'addNewGroup()',
        'style': 'margin:10px; padding:10px; width:150px; text-align:center; position:middle;'
      }, 'Add Group')
    ])
  ])
}
