var h = require('hyperscript')

module.exports = function () {
  return h('div', [
    h('.fixedHeader#addPersonNav', {
        'style': 'height:64px;background-color:white;'
    }, [
      h('.aligntoBottom', [
        h('ul.topNav', {
          'style': 'margin-left:30px;',
        }, [
          h('li',  {
            'data-ng-class': "showPeople === 'members' ? 'selectedTopNav' : 'notSelected'",
            'data-ui-sref': 'newMember'
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'members'"
            }, 'PARTICIPANTS')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'physicians' ? 'selectedTopNav' : 'notSelected'",
            'data-ui-sref': 'newPhysician'
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'physicians'"
            }, 'PHYSICIANS')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'trainers' ? 'selectedTopNav' : 'notSelected'",
            'data-ui-sref': 'newTrainer'
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'trainers'"
            }, 'TRAINERS')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'users' ? 'selectedTopNav' : 'notSelected'",
            'data-ui-sref': 'newNavigator'
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'users'"
            }, 'NAVIGATORS')
          ])
        ])  
      ])
    ])
  ])
}
