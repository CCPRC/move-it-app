
window.pouchdb = require('pouchdb')

var ng = require('angular')
var ee = require('./services')()
var h = require('hyperscript')
var moment = require('moment')
var $ = require('jquery')
var underscore = require('underscore')
var d3 = require("d3")
var angularDragula = require('angular-dragula')

window.angular = ng
require('angular-cookies')
require('auth0-angular')
require('angular-storage')
require('angular-jwt')
require('angucomplete-alt')
require('angular-ui-bootstrap')
require('angular-file-saver')
require('ng-file-upload')
require('./components/calendarWrapper')

document.head.appendChild(
  h('link',{
    rel:'stylesheet',
    href:'main.css'
  })
)

document.body.appendChild(
  h('div', { 'data-ui-view': '' })
)

ng.module('app', [
  require('angular-ui-router'),
  'auth0',
  'angular-storage',
  'angular-jwt',
  'angucomplete-alt',
  'ui.bootstrap',
  'ngFileSaver',
  'ngFileUpload',
  angularDragula(ng),
  'ui.calendar'
])

  .constant('ee', ee)
  .constant('moment', moment)
  .constant('underscore', underscore)
  .config(['authProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider',
    function (authProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
      authProvider.init({
        domain: 'lincsio.auth0.com',
        clientID: '40nldGLEwBZ6KVn4IvRRB78ZSDxp492v',
        loginState: 'login'
      })
      $urlRouterProvider.otherwise('/login')
      $stateProvider
        .state('newProfile', require('./components/dashboard/logIn/newProfile'))
        .state('all', require('./components/dashboard/all'))
        .state('infoPage', require('./components/dashboard/infoPage'))
        .state('userProfile', require('./components/userProfile/userProfile'))
        .state('currentClass', require('./components/dashboard/class'))
        .state('currentGroup', require('./components/dashboard/currentGroup'))
        .state('currentReport', require('./components/dashboard/report'))
        .state('dashboard', require('./components/dashboard/dashboard'))
        .state('groups', require('./components/dashboard/groups'))
        .state('classes', require('./components/dashboard/classes'))
        .state('reporting', require('./components/dashboard/reporting'))
        .state('newNavigator', require('./components/dashboard/navigator/newNavigator'))
        .state('newMember', require('./components/dashboard/member/newMember.js'))
        .state('newPhysician', require('./components/dashboard/physician/newPhysician'))
        .state('newTrainer', require('./components/dashboard/trainer/newTrainer'))
        .state('userPage', require('./components/dashboard/userPage'))
        .state('login', require('./components/dashboard/logIn/login'))
        .state('info', require('./components/member/info'))
        .state('metrics', require('./components/member/metrics'))
        .state('questionnaire', require('./components/member/questionnaire'))
        .state('classesCal', require('./components/member/classesCal'))
        .state('devices', require('./components/member/devices'))
        .state('files', require('./components/member/files'))
        .state('notes', require('./components/member/notes'))
        .state('assessments', require('./components/member/assessments'))
        .state('assessmentDetail', require('./components/member/assessmentDetail'))
        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      })
    }])
  .directive('topnav', require('./components/member/topNav'))
  .directive('booking', require('./directives/timeKit.js'))
  .directive('linechart', require('./directives/linechart'))
  .factory('notes', ['$http', require('./factories/notes')])
  .factory('assessments', ['$http', require('./factories/assessments')])
  .factory('attendance', ['$http', require('./factories/attendance')])
  .factory('reports', ['$http', require('./factories/report')])
  .factory('courses', ['$http', require('./factories/course')])
  .factory('attendance', ['$http', require('./factories/attendance')])
  .factory('emailSvc', ['$http', require('./factories/email')])
  .factory('fitbit', ['$http', require('./factories/fitbit')])
  .factory('groups', ['$http', require('./factories/group')])
  .factory('keen', ['$http', require('./factories/keen')])
  .factory('trainers', ['$http', require('./factories/trainer')])
  .factory('physicians', ['$http', require('./factories/physician')])
  .factory('members', ['$http', require('./factories/member')])
  .factory('stats', ['$http', require('./factories/stats')])
  .factory('uploadSvc', ['$http', require('./factories/fileUpload')])
  .factory('users', ['$http', require('./factories/users')])
  .service('optionService', [require('./services/options')])
  .directive('membertoolbar', require('./components/shared/membertoolbar'))
  .directive('scheduledisplay', require('./components/shared/scheduleDisplay'))
  .filter('capitalize', function() {
    return function(input){
      return(!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : ''
    }
  })
  .filter('age', require('./filters/age'))
  .filter('ethnicity', require('./filters/ethnicity'))
  .filter('gender', require('./filters/gender'))
  .filter('hospital', require('./filters/hospital'))
  .filter('physician', require('./filters/physician'))
  .filter('status', require('./filters/status'))
  .filter('zipcode', require('./filters/zip'))
  .run(function(auth) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents()
  })

// manually bootstrap angular
ng.element(document).ready(function() {
  ng.bootstrap(document, ['app'])
})
