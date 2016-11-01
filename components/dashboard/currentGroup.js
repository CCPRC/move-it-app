var h = require('hyperscript')
var topTools = require('../shared/topTools.js')
var _ = require('underscore')

module.exports = {
  url: '/currentGroup',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'users', 'store', 'optionService', 'groups', 'members', component]
}

function component ($scope, $state, users, store, optionService, groups, members) {
  $scope.currentUser = store.get('fullProfile')
  $scope.currentGroup = store.get('currentGroup')
  $scope.class = 'show'

  groups.list().then(function (allGroups) {
    $scope.allGroups = allGroups
  })
  $scope.removeParticipant = function (el) {
    $scope.currentGroup.members.splice(el, 1)
    runGroupMemberCheck()
  }

  $scope.updateGroup = function () {
    groups.update($scope.currentGroup).then(function (res) {
      $state.go('groups')
    })
  }
  function runGroupMemberCheck () {
    members.list().then(function (allMembers) {
      $scope.allPeople = allMembers
      if ($scope.currentGroup.members) {
        for (var i = 0; i < $scope.allPeople.length; i++) {
          for (var j = 0; j < $scope.currentGroup.members.length; j ++) {
            if ($scope.currentGroup.members[j]._id === $scope.allPeople[i]._id) {
              $scope.allPeople.splice(i, 1)
            }
          }
        }
      }
    })
  }
  runGroupMemberCheck()
  $scope.addParticipant = function (participant) {
    var participantIndex = $scope.allPeople.indexOf(participant)
    $scope.allPeople.splice(participantIndex, 1)
    $scope.currentGroup.members.push(participant)
  }
  $scope.removeParticipant = function (member) {
    var memberIndex = $scope.currentGroup.members.indexOf(member)
    $scope.currentGroup.members.splice(memberIndex, 1)
    $scope.allPeople.push(member)
  }
}

function render () {
  return h('div#groupPage', [
    h('membertoolbar', {
      'data-currentpage': 'classes'
    }),
    topTools,
    h('nav.navbar.navbar-default.fixedHeader', {
      'style': 'height:120px;'
    }, [
      h('div', {
        'style': 'margin-left:30px;margin-top:10px;'
      }, [
        h('h4', {
          'style': 'line-height:0.2;'
        }, '{{currentGroup.groupName}}'),
        h('div', {
          'style': 'margin: 0 0 0 1100px'
        }, [
          h('a', {
            'href': '#/all'
          }, [
            h('img', {
              'src': 'img/peopleIcon.svg',
              'style': 'display: inline-block;position: fixed;top: 10px;right: 10px;'
            })
          ])
        ])
      ]),
      h('.infoTab.selectedTopNav', {
        'style': 'position:absolute;left:50px;bottom:0px;line-height:37px;'
      }, 'INFO')
    ]),
    h('.fixedContainer', [
      h('.col-md-12', {
        'style': 'height: 100%;margin-bottom:20px;'
      }, [
        h('.panel.panel-default', [
          h('.col-md-12', [
            h('.form-group', [
              h('p.formP', 'GROUP NAME'),
              h('input.form-control', {
                'id': 'name',
                'type': 'text',
                'required': '',
                'data-ng-model': 'currentGroup.groupName',
                'data-ng-value': 'currentGroup.groupName'
              })
            ])
          ]),
          h('.col-md-6', [
            h('h4', 'Group Members'),
            h('div.participants#participants.container', {
              'style': 'width:100%;'
            }, [
              h('h4.medGreyTxt', {
                'data-ng-hide': 'currentGroup.members.length > 0',
                'style': 'text-align:center;'
              }, 'Add Participants from All People'),
              h('div.personBlock', {
                'data-ng-repeat': "member in currentGroup.members",
                'style': 'background-color:white;'
              }, [
                h('.col-md-2.col-xs-2.groupMemberAvatar', [
                  h('img.participantAvatar', {
                    'data-ng-src': "{{member.avatar || 'img/images.png'}}",
                    'style': 'border-radius:100%;width:50%;'
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
                    'style': 'border-radius:100%;width:50%;'
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
        ])
      ]),
      h('hr'),
      h('.right', {
        'style':'margin-right:20px;margin-top:20px;'
      },[
        h('btn.btn-lg.btn-default.inline', {
          'style': 'position:middle;margin-right:15px;',
          'data-ui-sref': 'groups'
        }, 'Back'),
        h('btn.btn-lg.btn-primary', {
          'style': 'position:middle;',
          'data-ng-click': 'updateGroup()'
        }, 'SAVE')
      ])
    ])
  ])
}
