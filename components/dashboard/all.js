var h = require('hyperscript')
var peoplenav = require('./peoplenav')

module.exports = {
  url: '/',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'store', 'members', 'physicians', 'trainers', 'users', component]
}

function component ($scope, $state, store, members, physicians, trainers, users) {

  members.list().then(function (allMembers) {
    $scope.allMembers = allMembers
  })
  users.listNavigators().then(function (allNavigators) {
    $scope.allNavigators = allNavigators
  })
  users.listPhysicians().then(function (allPhysicians) {
    $scope.allPhysicians = allPhysicians
  })
  users.listTrainers().then(function (allTrainers) {
    $scope.allTrainers = allTrainers
  })
  $scope.showPeople = 'all'
  $scope.addThisPersonType = function () {
    if ($scope.showPeople === 'members' || $scope.showPeople === 'all') {
      $state.go('newMember')
    }
    if ($scope.showPeople === 'trainers') {
      $state.go('newTrainer')
    }
    if ($scope.showPeople === 'physicians') {
      $state.go('newPhysician')
    }
    if ($scope.showPeople === 'users') {
      $state.go('newNavigator')
    } else {
      console.log('error')
    }
  }
  $scope.addNewMember = function (member) {
    var newMember = {}
    newMember = {
      'firstName': member.firstName,
      'lastName': member.lastName,
      'dob': member.dob,
      'email': member.email
    }
    users.create(newMember).then(function (res) {
      console.log(res)
    })
  }
  $scope.setCurrentMember = function (member) {
    store.set('currentMember', member)
  }
  $scope.setCurrentParticipant = function (participant) {
    store.set('currentParticipant', participant)
  }
  $scope.searchOpen = {
    'open': false
  }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    h('.expandableSearch', {
      'style': 'position: absolute; top: 15px; right: 15px; display: block; z-index:5;'
    }, [
      h('.searchIconClick', {
        'data-ng-click': 'searchOpen.open = !searchOpen.open',
      }, [
        h('img#searchIcon', {
          'src': 'img/magGlass.png',
          'style': 'width: 20px; height: 20px;margin-top:10px;display:inline-block;float:left;cursor: pointer'
        }),
      ]),
      h('.searchField', {
        'data-ng-class': "searchOpen['open'] ? 'searchOpened' : 'searchClosed'",
      }, [
        h('input', {
          'type': 'text',
          'data-ng-model': 'searchText',
          'style': 'line-height:30px;width:100%;'
        })
      ])
    ]),
    peoplenav,
    h('.fixedContainerShort#peopleAllContainer', [
      h('.col-md-12', {'style': 'overflow:scroll;'}, [
        h('.col-md-12', [
          h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
            'style': 'background-color:#ededed; border: 2px dotted #D3D3D3; display: flex; align-items: center; justify-content: center; padding: 26px;',
            'data-ng-click': 'addThisPersonType()'
          }, [
            h('a', {
              'style': 'cursor:pointer; text-align:center;',
              'data-ng-click': 'addThisPersonType()'
            }, [
              h('h5.inline', {
                'data-ng-click': 'addThisPersonType()'
              }, ' +'),
              h('h5.inline.medGreyTxt', {
                'style': 'margin-left:10px;',
                'data-ng-click': 'addThisPersonType()'
              }, 'Add New Person')
            ])
          ])
        ]),
        h('.col-md-4', {
          'style': 'cursor:pointer;',
          'data-ng-repeat': "member in allMembers | orderBy:'lastName' | filter:searchText",
          'data-ui-sref': 'metrics({member_id : member._id})',
          'data-ng-click': 'setCurrentMember(member); setStaffType(member)',
          'data-ng-show': "showPeople === 'all' || showPeople === 'members'"
        }, [
          h('.panel.panel-default.shadowHover', [
            h('.panel-body', {
              'style': 'padding:25px; min-height: 90px;'
            }, [
              h('a', {
                'style': 'cursor:pointer;'
              }, [
                h('h4', {
                  'style': 'float:left; width:40px; padding: 0; border-radius:100%;',
                  'data-ng-hide': 'member.avatar'
                }, "{{member.firstName | limitTo:1 || 'N'}}", "{{member.lastName | limitTo:1 || 'a'}}"),
                h('img', {
                  'data-ng-show': 'member.avatar',
                  'data-ng-src': '{{member.avatar}}',
                  'style': 'float:left; width:40px; height:40px; border-radius:100%; margin-right:15px;'
                }),
                h('.memberTxtInfo.inline', [
                  h('span', {
                    'style': 'color:black;'
                  }, '{{member.firstName}} {{member.lastName}}'),
                  h('br'),
                  h('span', {
                    'style': 'color: lightgrey; margin-left:4px;'
                  }, 'Participant')
                ])
              ])
            ])
          ])
        ]),
        h('.col-md-4', {
          'data-ng-repeat': "physician in allPhysicians | orderBy:'lastName' | filter:searchText",
          'data-ui-sref': 'infoPage({staff_id : physician._id})',
          'data-ng-click': 'setCurrentParticipant(physician); setStaffType(physician)',
          'data-ng-show': "showPeople === 'all' || showPeople === 'physicians'"
        }, [
          h('.panel.panel-default.shadowHover', [
            h('.panel-body', {
              'style': 'padding:25px; min-height: 90px;'
            }, [
              h('a', {
                'style': 'cursor:pointer;'
              }, [
                h('h4', {
                  'style': 'float:left; width:40px; padding: 0; border-radius:100%;',
                  'data-ng-hide': 'physician.avatar'
                }, "{{physician.firstName | limitTo:1 || 'N'}}", "{{physician.lastName | limitTo:1 || 'a'}}"),
                h('img', {
                  'data-ng-show': 'physician.avatar',
                  'data-ng-src': '{{physician.avatar}}',
                  'style': 'float:left; width:40px; height:40px; border-radius:100%; margin-right:15px;'
                }),
                h('.memberTxtInfo.inline', [
                  h('span', {
                    'style': 'margin-top:10px; color:black;'
                  }, '{{physician.firstName}} {{member.lastName}}'),
                  h('br'),
                  h('span', {
                    'style': 'color: lightgrey; margin-left:4px;'
                  }, 'Physician')
                ])
              ])
            ])
          ])
        ]),
        h('.col-md-4', {
          'data-ng-repeat': "trainer in allTrainers | orderBy:'lastName' | filter:searchText",
          'data-ui-sref': 'infoPage({staff_id : trainer._id})',
          'data-ng-click': 'setCurrentParticipant(trainer); setStaffType(trainer)',
          'data-ng-show': "showPeople === 'all' || showPeople === 'trainers'"
        }, [
          h('.panel.panel-default.shadowHover', [
            h('.panel-body', {
              'style': 'padding:25px; min-height: 90px;'
            }, [
              h('a', {
                'style': 'cursor:pointer;'
              }, [
                h('h4', {
                  'style': 'float:left; width:40px; padding: 0; border-radius:100%;',
                  'data-ng-hide': 'trainer.avatar'
                }, "{{trainer.firstName | limitTo:1 || 'N'}}", "{{trainer.lastName | limitTo:1 || 'a'}}"),
                h('img', {
                  'data-ng-show': 'trainer.avatar',
                  'data-ng-src': '{{trainer.avatar}}',
                  'style': 'float:left; width:40px; height:40px; border-radius:100%; margin-right:15px;'
                }),
                h('.memberTxtInfo.inline', [
                  h('span', {
                    'style': 'margin-top:10px; color:black;'
                  }, '{{trainer.firstName}} {{trainer.lastName}}'),
                  h('br'),
                  h('span', {
                    'style': 'color: lightgrey; margin-left:4px;'
                  }, 'Trainer')
                ])
              ])
            ])
          ])
        ]),
        h('.col-md-4', {
          'data-ng-repeat': "user in allNavigators | orderBy:'lastName' | filter:searchText",
          'data-ui-sref': 'infoPage({staff_id : user._id})',
          'data-ng-click': 'setCurrentParticipant(user); setStaffType(user)',
          'data-ng-show': "showPeople === 'all' || showPeople === 'users'"
        }, [
          h('.panel.panel-default.shadowHover', [
            h('.panel-body', {
              'style': 'padding:25px; min-height: 90px;'
            }, [
              h('a', {
                'style': 'cursor:pointer;'
              }, [
                h('h4', {
                  'style': 'float:left; width:40px; padding: 0; border-radius:100%;',
                  'data-ng-hide': 'user.avatar'
                }, "{{user.firstName | limitTo:1 || 'N'}}", "{{user.lastName | limitTo:1 || 'a'}}"),
                h('img', {
                  'data-ng-show': 'user.avatar',
                  'data-ng-src': '{{user.avatar}}',
                  'style': 'float:left; width:40px; height:40px; border-radius:100%; margin-right:15px;'
                }),
                h('.memberTxtInfo.inline', [
                  h('span', {
                    'style': 'margin-top:10px; color:black;'
                  }, '{{user.firstName}} {{user.lastName}}'),
                  h('br'),
                  h('span', {
                    'style': 'color: lightgrey; margin-left:4px;'
                  }, 'Navigator')
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
