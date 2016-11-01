var h = require('hyperscript')

module.exports = function () {
  return h('div.yo', [
      h('.fixedHeader#memberNav', {
        'style': 'height:130px;background-color:white;'
      }, [
        h('.memberQuickInfoRow', [
          h('img.memberAvatar .inline', {
            'data-ng-src': '{{currentMember.avatar || img/images.png}}',
            'data-ng-if': 'currentMember.avatar'
          }),
          h('.memberInfoBox .inline', [
            h('.memberName', '{{currentMember.firstName}} {{currentMember.lastName}}'),
            h('select.form-control.memberActiveStatus', {
              'id': 'status',
              'data-ng-change': 'updateMember()',
              'data-ng-value': 'currentMember.status',
              'data-ng-model': 'currentMember.status'
            }, [
              h('option', {
                'data-ng-repeat': 'statusOption in statusOptions'
              }, [
                h('.inline', '{{statusOption.type}}' )
              ])
            ])
          ])
        ]),
        h('.aligntoBottom', [
          h('ul.topNav', [
            h('li', {
              'data-ng-class': "page === 'metrics' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'metrics'
              }, 'METRICS')
            ]),
            h('li', {
              'data-ng-class': "page === 'info' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'info'
              }, 'INFO')
            ]),
            h('li', {
              'data-ng-class': "page === 'classes' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'classesCal'
              }, 'CLASSES')
            ]),
            h('li', {
              'data-ng-class': "page === 'devices' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'devices'
              }, 'DEVICES')
            ]),
            h('li', {
              'data-ng-class': "page === 'files' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'files'
              }, 'FILES')
            ]),
            h('li', {
              'data-ng-class': "page === 'notes' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'notes({member_id : member_id})'
              }, 'NOTES')
            ]),
            h('li', {
              'data-ng-class': "page === 'assessments' ? 'selectedTopNav' : 'notSelected'"
            }, [
              h('.navItem', {
                'data-ui-sref': 'assessments({member_id : member_id})'
              }, 'ASSESSMENTS')
            ])
          ])
        ])
      ])
    ])
}
