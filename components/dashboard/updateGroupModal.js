var h = require('hyperscript')

module.exports = function () {
  return h('div.modal-content', [
    h('div.modal-header', [
      h('h4', 'Update Group')
    ]),
    h('.col-md-12.col-xs-12', [
      h('.col-md-12', [
        h('.form-group', [
          h('p.formP', 'GROUP NAME'),
          h('input.form-control', {
            'id': 'name',
            'type': 'text',
            'required': '',
            'data-ng-model': 'currentGroup.groupName'
          })
        ]),
      ]),
    ]),
    h('hr'),
    h('.col-md-12.col-xs-12#participantEdit', {
      'style': 'padding-bottom: 20px;'
    }, [
      h('.col-md-6', [
        h('h4', 'Group Members'),
        h('div.participants#participants.container', {
          'style': 'width:100%;'
        }, [
          h('h4.medGreyTxt', {
            'data-ng-hide': 'currentGroup.members.length > 0',
            'style': 'text-align:center;'
          }, 'Add Group Members from All People'),
          h('div.personBlock', {
            'data-ng-repeat': "member in currentGroup.members",
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
            'data-ng-repeat': "person in allPeople",
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
      h('button.btn.btn-danger', {
        'style': 'margin:10px;padding:10px; width:150px; text-align:center; position:middle;',
        'data-ng-click': "deleteGroup()"
      }, 'Delete Group'),
      h('button.btn.btn-info', {
        'data-ng-click': 'updateGroup()',
        'style': 'margin:10px; padding:10px; width:150px; text-align:center; position:middle;'
      }, 'Update Group')
    ])
  ])
}
