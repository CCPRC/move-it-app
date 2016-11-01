var h = require('hyperscript')

module.exports = function () {
  return {
    template: template().outerHTML,
    controller: ['$scope', controller],
    scope: {
      schedule: '=',
      repeat: '@repeat'
    }
  }
}

function controller ($scope) {
  var every = 'every'
  var mon = 'Mon'
  var tues = 'Tues'
  var wed = 'Wed'
  var thur = 'Thur'
  var fri = 'Fri'
  var sat = 'Sat'
  var sund = 'Sun'
  $scope.scheduleOutput = ''
  
  if ($scope.schedule) {
    if($scope.schedule.mon) {
      $scope.scheduleOutput += mon
    }
    if ($scope.schedule.tues) {
      if ($scope.scheduleOutput.length > 0) {
        $scope.scheduleOutput += ' & ' + tues
      } else {
        $scope.scheduleOutput += tues  
      }
    }
    if($scope.schedule.wed) {
      if ($scope.scheduleOutput.length > 0) {
        $scope.scheduleOutput += ' & ' + wed
      } else {
        $scope.scheduleOutput += wed  
      }
    }
    if($scope.schedule.thu) {
      if ($scope.scheduleOutput.length > 0) {
        $scope.scheduleOutput += ' & ' + thur
      } else {
        $scope.scheduleOutput += thur  
      }
    }
    if($scope.schedule.fri) {
      if ($scope.scheduleOutput.length > 0) {
        $scope.scheduleOutput += ' & ' + fri
      } else {
        $scope.scheduleOutput += fri 
      }
    }
    if($scope.schedule.sat) {
      if ($scope.scheduleOutput.length > 0) {
        $scope.scheduleOutput += ' & ' + sat
      } else {
        $scope.scheduleOutput += sat  
      }
    }
    if($scope.schedule.sun) {
      if ($scope.scheduleOutput.length > 0) {
        $scope.scheduleOutput += ' & ' + sund
      } else {
        $scope.scheduleOutput += sund  
      }
    }
  }
}

function template () {
  return h('.scheduleTextOutput', '{{scheduleOutput}}')
}
