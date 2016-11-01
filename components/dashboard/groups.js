var h = require('hyperscript')
var topTools = require('../shared/topTools.js')
var newGroupModal = require('./newGroupModal.js')
var updateGroupModal = require('./updateGroupModal.js')

module.exports = {
  url: '/groups',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'groups', 'members', 'store', 'optionService', 'users', '$uibModal', '$q', component]
}

function component ($scope, $state, groups, members, store, optionService, users, $uibModal, $q) {
  $scope.currentUser = store.get('fullProfile')
  $scope.ethnicities = optionService.get('ethnicities')
  $scope.hospitals = optionService.get('hospitals')
  $scope.statuses = optionService.get('statuses')
  users.listPhysicians().then(function (allPhysicians) {
    $scope.physicians = allPhysicians
  })
  $scope.class = 'show'
  $scope.filter = {
    'startDate': '',
    'endDate': '',
    'metric': '',
    'ethnicity': false,
    'ageStart': 0,
    'ageEnd': 100,
    'status': false,
    'hospital': false,
    'physician': '',
    'gender': false,
    'allAge': true,
    'zipcode': ''
  }
  groups.list().then(function (allGroups) {
    $scope.allGroups = allGroups
  })
  members.list().then(function (allMembers) {
    $scope.allPeople = allMembers
  })
  $scope.removeParticipant = function (member) {
    var memberIndex = $scope.groupMembers.indexOf(member)
    $scope.groupMembers.splice(memberIndex, 1)
    $scope.allPeople.push(member)
  }
  $scope.addParticipant = function (participant) {
    var participantIndex = $scope.allPeople.indexOf(participant)
    $scope.allPeople.splice(participantIndex, 1)
    $scope.groupMembers.push(participant)
  }
  $scope.setCurrentGroup = function (group) {
    $scope.currentGroup = group
    runCurrentGroupAttendanceCheck().then(function (newPeople) {
      buildAllPeople(newPeople)
    })
  }
  $scope.groupMembers = []

  $scope.addNewGroup = function (group) {
    var newGroup = {}
    if($scope.currentUser && $scope.currentUser.firstName && $scope.currentUser.lastName) {
      newGroup = {
        'groupName': $scope.groupName,
        'creator': $scope.currentUser.firstName + ' ' + $scope.currentUser.lastName,
        'members': $scope.groupMembers
      }
    } else {
      newGroup = {
        'groupName': $scope.groupName,
        'creator': 'NA',
        'members': $scope.groupMembers
      }
    }
    groups.create(newGroup).then(function (res) {
      console.log('newGroup', newGroup)
      $state.reload()
    })
  }
  $scope.resetAllPeople = function () {
    members.list().then(function (allMembers) {
      $scope.allPeople = allMembers
    })
  }
  function runCurrentGroupAttendanceCheck () {
    var deferred = $q.defer();
    var newPeople = []
      if ($scope.currentGroup) {
        for (var i = 0; i < $scope.allPeople.length; i++) {
          for (var j = 0; j < $scope.currentGroup.members.length; j ++) {
            if ($scope.currentGroup.members[j]._id === $scope.allPeople[i]._id) {
              newPeople.push($scope.currentGroup.members[j])
            }
          }
        }
      }
      deferred.resolve(newPeople);
      return deferred.promise;
  }
  function buildAllPeople (newPeople) {
    angular.forEach(newPeople, function(person) {
      angular.forEach($scope.allPeople, function(allPeoplePerson) {
        if(allPeoplePerson._id === person._id){
          var indexOfPerson = $scope.allPeople.indexOf(allPeoplePerson)
          $scope.allPeople.splice(indexOfPerson, 1)
        }
      })
    })
  }
  $scope.openNewGroupModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: newGroupModal().outerHTML,
      scope: $scope
    });
  }
  $scope.updateGroup = function () {
    groups.update($scope.currentGroup).then(function(){
      $state.reload()
    })
  }
  $scope.openUpdateGroupModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: updateGroupModal().outerHTML,
      scope: $scope
    });
  }
  $scope.deleteGroup = function () {
    if(confirm('Are you sure you want to delete this group?')){
      groups.remove($scope.currentGroup._id).then(function () {
        $state.reload()
      })
    } else {
      console.log('no delete')
    }
  }
  $scope.searchOpen = {
    'open': false
  }
}

function render () {
  return h('div#groupPage', [
    h('membertoolbar', {
      'data-currentpage': 'groups'
    }),
    topTools,
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
    h('.fixedContainerShort', [
      h('.col-md-12', [
        h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
          'style': '',
          'data-ng-click': 'openNewGroupModal(); resetAllPeople()'
        }, [
          h('div', {
            'style': 'cursor:pointer; text-align: center;'
          }, [
            h('h5.inline', ' +'),
            h('h5.inline.medGreyTxt', {
              'style': 'margin-left:10px;'
            }, 'Add New Group')
          ])
        ])
      ]),
      h('.col-md-4', {
        'data-ng-repeat': "group in allGroups | orderBy:'groupName' | filter: searchText",
        'data-ng-click' : 'setCurrentGroup(group); openUpdateGroupModal();'
      }, [
        h('.panel.panel-default.shadowHover', [
          h('.panel-body', {
            'style': 'padding:25px; min-height: 100px'
          }, [
            h('div', [
              h('.cardGroupName', '{{group.groupName}}'),
              h('.greyTxt', 'Created by {{group.creator}}')
            ])
          ])
        ])
      ]),
    ])
  ])
}
