var h = require('hyperscript')
var topTools = require('../shared/topTools.js')
var newClassModal = require('./newClassModal.js')
var updateClassModal = require('./updateClassModal.js')

module.exports = {
  url: '/classes',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'courses', 'trainers', 'optionService', 'store', 'courses', 'members', 'attendance', '$uibModal', '$q', '$stateParams', component],
  params: {
    course_id: null
  }
}

function component ($scope, $state, courses, trainers, optionService, store, courses, members, attendance, $uibModal, $q, $stateParams) {
  if($stateParams.course_id) {
    console.log($stateParams.course_id)
    courses.get($stateParams.course_id).then(function(res){
      $scope.currentCourse = res[0].doc
      console.log(res)
      runCurrentCourseAttendanceCheck().then(function (newPeople) {
        buildAllPeople(newPeople)
      })
      setTimeout(function(){
        $scope.openUpdateClassModal()
      },1000)
    })
  }
  members.list().then(function (allMembers) {
    $scope.allPeople = allMembers
    $scope.allPeopleArchive = allMembers
  })
  $scope.courseDays = [];
  $scope.attendance = []
  $scope.repeatOptions = optionService.get('repeats')
  $scope.durationOptions =  optionService.get('durations')
  $scope.hourOptions = optionService.get('hours')
  $scope.minuteOptions = optionService.get('minutes')
  $scope.categories = optionService.get('categories')
  trainers.list().then(function (allTrainers) {
    $scope.trainerOptions = allTrainers
  })
  $scope.mytime = new Date()
  $scope.hstep = 1
  $scope.mstep = 1
  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  }
  $scope.ismeridian = true
  $scope.periodOptions = optionService.get('periods')
  $scope.course = {
    'attendance': '',
    'courseName': '',
    'courseCode': '',
    'address': '',
    'duration': '',
    'hour': '',
    'min': '',
    'amPm': '',
    'period': '',
    'ends': false,
    'occurances': '',
    'endDate': '',
    'program': '',
    'trainer': '',
    'maxMembers': '',
    'category': ''
  }
  $scope.duration
  $scope.hour
  $scope.min
  $scope.period
  $scope.program
  $scope.trainer
  $scope.maxMembers
  $scope.status = {
    repeatOpen: false,
    durationOpen: false,
    hourOpen: false,
    minOpen: false,
    periodOpen: false,
    programOpen: false,
    trainerOpen: false
  }
  $scope.programOptions = ['senior jamz', 'kids fun dungeon']

  courses.list().then(function (allCourses) {
    $scope.allCourses = allCourses
  })
  function runCurrentCourseAttendanceCheck () {
    var deferred = $q.defer();
    var newPeople = []
      if ($scope.currentCourse) {
        for (var i = 0; i < $scope.allPeople.length; i++) {
          for (var j = 0; j < $scope.currentCourse.attendance.length; j ++) {
            if ($scope.currentCourse.attendance[j]._id === $scope.allPeople[i]._id) {
              newPeople.push($scope.currentCourse.attendance[j])
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
  $scope.setCurrentCourse = function (course) {
    store.set('currentCourse', course)
    $scope.currentCourse = course
    runCurrentCourseAttendanceCheck().then(function (newPeople) {
      buildAllPeople(newPeople)
    })
  }

  $scope.repeatWhen = function (type) {
    if (type === 'after' || type === 'on') {
      $scope.course.ends = 'true'
    } else if (type === 'never') {
      $scope.course.ends = 'false'
      $scope.course.endDate = ''
      $scope.course.occurances = ''
    }
  }
  $scope.addNewCourse = function (course) {
    console.log('attendance commit', $scope.attendance)
    var newAttendance = {}
    var newCourse = {}
    newCourse = {
      'attendance': $scope.attendance,
      'courseName': $scope.course.courseName,
      'courseCode': $scope.course.courseCode,
      'address': $scope.course.address,
      'repeat': $scope.course.repeats,
      'duration': $scope.course.duration,
      'hr': $scope.course.hour,
      'min': $scope.course.min,
      'period': $scope.course.period,
      'onDays': {
        sund: $scope.course.onDays.sund,
        mon: $scope.course.onDays.mon,
        tues: $scope.course.onDays.tues,
        wed: $scope.course.onDays.wed,
        thu: $scope.course.onDays.thu,
        fri: $scope.course.onDays.fri,
        sat: $scope.course.onDays.sat
      },
      'ends': $scope.course.ends,
      'occurances': $scope.course.occurances,
      'endDate': $scope.course.endDate,
      'program': $scope.course.program,
      'trainer': $scope.course.trainer,
      'maxMembers': $scope.course.maxMembers
    }
    courses.create(newCourse).then(function (res) {
      $state.reload()
    })
  }

 grabNewCourse = function(result) {
   console.log("result in ctrl", result.data.object.id);
   var newCourse = result.config.data.object;
   angular.forEach(newCourse.attendance, function (attendee) {
     attendee.present = false
   })
      var b = new Date();
      var a = new Date($scope.course.endDate);
      var days = Math.round((a-b)/ 86400000);
      console.log(days);
      var weeks = parseFloat(Math.round((a-b)/ 604800000));
      // console.log(weeks); /// this calculates weeks

        if(newCourse.onDays.mon === true) {
          console.log("mondays");
          var mondays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.monday }));

        $scope.courseDays.push.apply($scope.courseDays, mondays);
      //  console.log("all the days", $scope.courseDays);
        }

        if(newCourse.onDays.tues === true) {
          var tuesdays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.tuesday }));

        $scope.courseDays.push.apply($scope.courseDays, tuesdays);
        }

        if(newCourse.onDays.wed === true) {
          var wednesdays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.wednesday }));

        $scope.courseDays.push.apply($scope.courseDays, wednesdays);
        }

        if(newCourse.onDays.thu === true) {
          var thursdays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.thursday }));

        $scope.courseDays.push.apply($scope.courseDays, thursdays);
        }

        if(newCourse.onDays.fri === true) {
          var fridays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.friday }));

        $scope.courseDays.push.apply($scope.courseDays, fridays);
        }
        if(newCourse.onDays.sat === true) {
          var saturdays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.saturday }));

        $scope.courseDays.push.apply($scope.courseDays, saturdays);
        }
        if(newCourse.onDays.sund === true) {
          var sundays = (daysnext.calculate({ from: new Date, daysahead: days, day: weekdays.sunday }));

        $scope.courseDays.push.apply($scope.courseDays, sundays);
        }

        var courseDays = ($scope.courseDays);
        console.log(courseDays);
        var courseDaysLength = ($scope.courseDays).length;
        for (var i = 0; i < courseDaysLength; i++) {

          console.log(courseDays[i]);
          newAttendance = {
            'parent_id' : result.data.object.id,
            'date' : (courseDays[i]),
            'attendees' : newCourse.attendance

          }
////// CREATE NEW ATTENDANCE/////////////////////

         attendance.create(newAttendance).then(function (res) {
            console.log("new Attendance", newAttendance);
         })
        }

}



//////////////////////////////////////////////////////////////////////////
//////////////////*******LOGIC FOR WEEKDAYS*******/////////////////////////////


    var daysnext = new NextDaysInPeriodCalculator('EN').instance;
    var weekdays = new Weekdays().EN;
  //  alert(daysnext.calculate({ from: new Date, daysahead: 14, day: weekdays.friday }))

   function NextDaysInPeriodCalculator() {
  this.instance = new NextDayCalculator();

  function NextDayCalculator(lang)  {
      this.lang = lang || 'EN';
      if (!this.constructor.prototype.inititalized) {
          var proto = this.constructor.prototype;
          proto.Stream = initstream();
          proto.startDay = getStartDay;
          proto.getDaystream = allDays;
          proto.calculate = nextNDays;
          proto.setArgs = setArgs;
          proto.initialized = true;
          this.setArgs();
      }
  }

  function setArgs(args) {
       args = args ||
              {
               from: new Date,
               daysahead: 30,
               day: 1
              };
       args.from = this.startDay(args.from, args.day);
       this.args = args;
       return this;
  };

  function nextNDays(args) {
    this.setArgs(args || null);
    var day = +args.day && args.day >=0 && args.day <= 6 ? args.day : 0;
    var dates = this.getDaystream();
    return dates.take( Math.floor(args.daysahead/7)).toArray();
  }

  function allDays() {
     var Str = this.Stream, self = this;
     return new Str( new Date(this.args.from),
                     function(){
                         return self.getDaystream().map(function (d) {
                             return new Date(d.setDate(d.getDate()+7));});
                     }
            );
  }

  function getStartDay(d, forday) {
     return d.getDay() != +forday
            ? ( d.setDate( d.getDate() + 1 ), this.startDay(d, forday) )
            : new Date(d);
  }

}

function Weekdays() {
    if (!this.constructor.prototype.NL) {
        var proto = this.constructor.prototype;
        proto.EN = enumerate.call(
            ('sunday,monday,tuesday,wednesday,'+
             'thursday,friday,saturday').split(',') );
        proto.NL = enumerate.call(
            ('zondag,maandag,dinsdag,woensdag,'+
             'donderdag,vrijdag,zaterdag').split(',') );
        proto.FR = enumerate.call(
            ('dimanche,lundi,mardi,mecredi,'+
             'jeudi,vendredi,samedi').split(',') );
        proto.DE = enumerate.call(
            ('Sonntag,Montag,Dienstag,Mittwoch,'+
             'Donnerstag,Freitag,Samstag').split(',') );
    }
    function enumerate(obj, arr) {
        arr = arr || this;
        obj = obj || {};
        arr.map( function(v,i) { obj[i] = v; obj[v] = i; } );
        return obj;
    }
}


///////***********************  STREAM CODE*********** //////////////////
// Note: added toArray method
function initstream() {
    function Stream( head, tailPromise ) {
        if ( typeof head != 'undefined' ) {
            this.headValue = head;
        }
        if ( typeof tailPromise == 'undefined' ) {
            tailPromise = function () {
                return new Stream();
            };
        }
        this.tailPromise = tailPromise;
    }

    // TODO: write some unit tests
    Stream.prototype = {
        empty: function() {
            return typeof this.headValue == 'undefined';
        },
        head: function() {
            if ( this.empty() ) {
                throw new Error('Cannot get the head of the empty stream.');
            }
            return this.headValue;
        },
        tail: function() {
            if ( this.empty() ) {
                throw new Error('Cannot get the tail of the empty stream.');
            }
            // TODO: memoize here
            return this.tailPromise();
        },
        item: function( n ) {
            if ( this.empty() ) {
                throw new Error('Cannot use item() on an empty stream.');
            }
            var s = this;
            while ( n != 0 ) {
                --n;
                try {
                    s = s.tail();
                }
                catch ( e ) {
                    throw new Error('Item index does not exist in stream.');
                }
            }
            try {
                return s.head();
            }
            catch ( e ) {
                throw new Error('Item index does not exist in stream.');
            }
        },
        length: function() {
            // requires finite stream
            var s = this;
            var len = 0;

            while ( !s.empty() ) {
                ++len;
                s = s.tail();
            }
            return len;
        },
        add: function( s ) {
            return this.zip( function ( x, y ) {
                return x + y;
            }, s );
        },
        append: function ( stream ) {
            if ( this.empty() ) {
                return stream;
            }
            var self = this;
            return new Stream(
                self.head(),
                function () {
                    return self.tail().append( stream );
                }
            );
        },
        zip: function( f, s ) {
            if ( this.empty() ) {
                return s;
            }
            if ( s.empty() ) {
                return this;
            }
            var self = this;
            return new Stream( f( s.head(), this.head() ), function () {
                return self.tail().zip( f, s.tail() );
            } );
        },
        map: function( f ) {
            if ( this.empty() ) {
                return this;
            }
            var self = this;
            return new Stream( f( this.head() ), function () {
                return self.tail().map( f );
            } );
        },
        concatmap: function ( f ) {
            return this.reduce( function ( a, x ) {
                return a.append( f(x) );
            }, new Stream () );
        },
        reduce: function () {
            var aggregator = arguments[0];
            var initial, self;
            if(arguments.length < 2) {
                if(this.empty()) throw new TypeError("Array length is 0 and no second argument");
                initial = this.head();
                self = this.tail();
            }
            else {
                initial = arguments[1];
                self = this;
            }
            // requires finite stream
            if ( self.empty() ) {
                return initial;
            }
            // TODO: iterate
            return self.tail().reduce( aggregator, aggregator( initial, self.head() ) );
        },
        sum: function () {
            // requires finite stream
            return this.reduce( function ( a, b ) {
                return a + b;
            }, 0 );
        },
        walk: function( f ) {
            // requires finite stream
            this.map( function ( x ) {
                f( x );
                return x;
            } ).force();
        },
        force: function() {
            // requires finite stream
            var stream = this;
            while ( !stream.empty() ) {
                stream = stream.tail();
            }
        },
        scale: function( factor ) {
            return this.map( function ( x ) {
                return factor * x;
            } );
        },
        filter: function( f ) {
            if ( this.empty() ) {
                return this;
            }
            var h = this.head();
            var t = this.tail();
            if ( f( h ) ) {
                return new Stream( h, function () {
                    return t.filter( f );
                } );
            }
            return t.filter( f );
        },
        take: function ( howmany ) {
            if ( this.empty() ) {
                return this;
            }
            if ( howmany == 0 ) {
                return new Stream();
            }
            var self = this;
            return new Stream(
                this.head(),
                function () {
                    return self.tail().take( howmany - 1 );
                }
            );
        },
        drop: function( n ){
            var self = this;

            while ( n-- > 0 ) {

                if ( self.empty() ) {
                    return new Stream();
                }

                self = self.tail();
            }

            // create clone/a contructor which accepts a stream?
            return new Stream( self.headValue, self.tailPromise );
        },
        member: function( x ){
            var self = this;

            while( !self.empty() ) {
                if ( self.head() == x ) {
                    return true;
                }

                self = self.tail();
            }

            return false;
        },
        toArray:  function( n ) {
            var target, result = [];
            if ( typeof n != 'undefined' ) {
                target = this.take( n );
            }
            else {
                // requires finite stream
                target = this;
            }
            target.walk( function ( x ) {
                result.push( x );
            } );
            return result;
        },
        print: function( n ) {
            var target;
            if ( typeof n != 'undefined' ) {
                target = this.take( n );
            }
            else {
                // requires finite stream
                target = this;
            }
            target.walk( function ( x ) {
                console.log( x );
            } );
        },
        toString: function() {
            // requires finite stream
            return '[stream head: ' + this.head() + '; tail: ' + this.tail() + ']';
        }
    };

    Stream.makeOnes = function() {
        return new Stream( 1, Stream.makeOnes );
    };
    Stream.makeNaturalNumbers = function() {
        return new Stream( 1, function () {
            return Stream.makeNaturalNumbers().add( Stream.makeOnes() );
        } );
    };
    Stream.make = function( /* arguments */ ) {
        if ( arguments.length == 0 ) {
            return new Stream();
        }
        var restArguments = Array.prototype.slice.call( arguments, 1 );
        return new Stream( arguments[ 0 ], function () {
            return Stream.make.apply( null, restArguments );
        } );
    };
    Stream.fromArray = function ( array ) {
        if ( array.length == 0 ) {
            return new Stream();
        }
        return new Stream( array[0], function() { return Stream.fromArray(array.slice(1)); } );
    };
    Stream.range = function ( low, high ) {
        if ( typeof low == 'undefined' ) {
            low = 1;
        }
        if ( low == high ) {
            return Stream.make( low );
        }
        // if high is undefined, there won't be an upper bound
        return new Stream( low, function () {
            return Stream.range( low + 1, high );
        } );
    };
    Stream.equals = function ( stream1, stream2 ) {
        if ( ! (stream1 instanceof Stream) ) return false;
        if ( ! (stream2 instanceof Stream) ) return false;
        if ( stream1.empty() && stream2.empty() ) {
            return true;
        }
        if ( stream1.empty() || stream2.empty() ) {
            return false;
        }
        if ( stream1.head() === stream2.head() ) {
            return Stream.equals( stream1.tail(), stream2.tail() );
        }
    };
    return Stream;
}

//////////////******************** END  Stream code******** //////////////////

///////////////////////////////////END LOGIC FOR WEEKDAYS//////////////


  $scope.open1 = function () {
    $scope.popup1.opened = true
  }
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  }
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
  $scope.format = $scope.formats[3]
  $scope.popup1 = {
    opened: false
  }
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  var afterTomorrow = new Date()
  afterTomorrow.setDate(tomorrow.getDate() + 1)
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ]

  $scope.getDayClass = function (date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0)
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0)
        if (dayToCheck === currentDay) {
          return $scope.events[i].status
        }
      }
    }
    return ''
  }
  $scope.addCurrentCourseParticipant = function (participant) {
    var participantIndex = $scope.allPeople.indexOf(participant)
    $scope.allPeople.splice(participantIndex, 1)
    $scope.currentCourse.attendance.push(participant)
  }
  $scope.removeCurrentCourseParticipant = function (attendee) {
    var attendeeIndex = $scope.currentCourse.attendance.indexOf(attendee)
    $scope.currentCourse.attendance.splice(attendeeIndex, 1)
    $scope.allPeople.push(attendee)
  }
  $scope.addParticipant = function (participant) {
    var participantIndex = $scope.allPeople.indexOf(participant)
    $scope.allPeople.splice(participantIndex, 1)
    $scope.attendance.push(participant)
  }
  $scope.removeParticipant = function (attendee) {
    var attendeeIndex = $scope.attendance.indexOf(attendee)
    $scope.attendance.splice(attendeeIndex, 1)
    $scope.allPeople.push(attendee)
  }
  $scope.openNewClassModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: newClassModal().outerHTML,
      scope: $scope
    });
  }
  $scope.resetAllPeople = function () {
    members.list().then(function (allMembers) {
      $scope.allPeople = allMembers
    })
  }
  $scope.updateCurrentCourse = function () {
    courses.update($scope.currentCourse).then(function (res) {
      $state.reload()
    })
  }
  $scope.openUpdateClassModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: updateClassModal().outerHTML,
      scope: $scope
    });
  }
  $scope.deleteCourse = function () {
    if(confirm('Are you sure you want to delete this course?')){
      courses.remove($scope.currentCourse._id).then(function () {
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
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'classes'
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
      h('.col-md-12', {
        'data-ng-click': "newClassModal['show'] = true",

      }, [
        h('.panel.panel-default.correctivePadding.removeShadow.addNewHover', {
          'style':'background-color:#ededed; border: 2px dotted #D3D3D3; display: flex; align-items: center; justify-content: center; padding: 35px;',
          'data-ng-click': "openNewClassModal(); resetAllPeople()"
        }, [
          h('div', {
            'style': 'cursor:pointer; text-align: center;'
          }, [
            h('h5.inline', ' +'),
            h('h5.inline.medGreyTxt', {
              'style': 'margin-left:10px;'
            }, 'Add New Class')
          ])
        ])
      ]),
      h('.col-md-4.classCardGrid', {
        'style': 'cursor:pointer;',
        'data-ng-click': 'setCurrentCourse(course); openUpdateClassModal()',
        'data-ng-repeat': "course in allCourses | orderBy:'courseName' | filter:searchText"
      }, [
        h('.classCard.shadowHover', [
          h('.courseName', '{{course.courseName}}'),
          h('.courseNum', '#{{course.courseCode}}'),
          h('.courseStrip', [
            h('.cardGreyTitle', 'ADDRESS'),
            h('.cardBlackInfo', '{{course.address}}')
          ]),
          h('.courseStrip', [
            h('.cardGreyTitle', 'SCHEDULE'),
            h('scheduledisplay', {
              'data-schedule':'course.onDays',
              'data-repeat': '{{course.repeat}}'
            })
          ]),
          h('.courseStrip', [
            h('.cardGreyTitle', 'DURATION'),
            h('.cardBlackInfo', '{{course.duration}}')
          ]),
          h('.courseStrip', [
            h('.cardGreyTitle', 'PEOPLE'),
            h('.avatarRow', {
            }, [
              h('div.smallClassAvatar.inline', {
                'data-ng-repeat': 'participant in course.attendance | limitTo: 6',
                'style': 'width:40px;height:40px; margin-right:5px;'
              }, [
                h('img.participantAvatar', {
                  'data-ng-src': '{{participant.avatar || img/images.png}}',
                  'data-ng-if': 'participant.avatar',
                  'style': 'border-radius:100%; width: 100%;'
                }),
                h('h6.participantAbrv', {
                  'data-ng-hide': 'participant.avatar',
                  'style': 'border-radius:100%; width: 100%; height: 100%; text-align: center;'
                }, "{{participant.firstName | limitTo:1 || 'N'}}", "{{participant.lastName | limitTo:1 || 'a'}}")
              ])
            ])
          ])
        ])
      ]),
    ])
  ])
}
