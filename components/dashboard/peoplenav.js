var h = require('hyperscript')

module.exports = function () {
  return h('div', [
    h('.fixedHeader#peopleNav', {
      'style': 'z-index:3;height:64px;padding-top:10px;'
    }, [
      h('.aligntoBottom', [
        h('ul.topNav', {
          'style': 'margin-left:30px;',
        }, [
          h('li', {
            'data-ng-class': "showPeople === 'all' ? 'selectedTopNav' : 'notSelected'",
            'data-ng-click': "showPeople = 'all'"
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'all'"
            }, 'ALL')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'members' ? 'selectedTopNav' : 'notSelected'",
            'data-ng-click': "showPeople = 'members'"
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'members'"
            }, 'PARTICIPANTS')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'physicians' ? 'selectedTopNav' : 'notSelected'",
            'data-ng-click': "showPeople = 'physicians'"
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'physicians'"
            }, 'PHYSICIANS')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'trainers' ? 'selectedTopNav' : 'notSelected'",
            'data-ng-click': "showPeople = 'trainers'"
          }, [
            h('.navItem', {
              'data-ng-click': "showPeople = 'trainers'"
            }, 'TRAINERS')
          ]),
          h('li', {
            'data-ng-class': "showPeople === 'users' ? 'selectedTopNav' : 'notSelected'",
            'data-ng-click': "showPeople = 'users'"
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
