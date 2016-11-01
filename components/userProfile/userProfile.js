var h = require('hyperscript')

module.exports = {
  url: '/userProfile',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'stats', 'store', '$stateParams', 'courses', 'Upload', 'optionService', 'users', 'uploadSvc', component]
}

function component ($scope, $state, stats, store, $stateParams, courses, Upload, optionService, users, uploadSvc) {
  $scope.currentUser = store.get('fullProfile')
  $scope.navigator = store.get('currentNavigator')
  $scope.physician = store.get('currentPhysician')
  $scope.trainer = store.get('currentTrainer')
  $scope.staff_id = $stateParams.staff_id
  $scope.profileScreen = 'show'
  $scope.states = optionService.get('states')
  $scope.showThis = {
    generalEdit: false,
    contactEdit: false
  }
  $scope.file
  $scope.init = function () {
    $scope.status = true
  }
  $scope.changeStatus = function () {
    $scope.status = !$scope.status
  }
  $scope.updateInfo = function () {
    users.update($scope.currentUser).then(function(res){
      if ($scope.file) {
        uploadSvc.uploadAvatar($scope.file, $scope.res._id)
      }
      store.set('fullProfile', $scope.currentUser)
      $state.reload()
    })
  }
  $scope.messageEnterPress = function (event) {
   if (!event.shiftKey && event.keyCode === 13) {
     event.preventDefault()
     $scope.updateInfo()
   }
 }
  courses.list().then(function (allCourses) {
    $scope.allCourses = allCourses
  })
  $scope.uploadFiles = function(file, errFiles) {
    $scope.file = file
    console.log(file)
    $scope.errFile = errFiles && errFiles[0]
  }
}

function render () {
  return h('div', [
    h('membertoolbar'),
    h('.userPageHeader', {
      'style': 'height:120px;position:fixed;left:200px;right:0;border-radius:0;border-botto'
    }, [
      h('div', {
        'style': 'margin-left:30px;margin-top:10px;'
      }, [
        h('img.avatarCircle', {
          'style': 'display:inline-block;width:40px;height:40px;border-radius:100%;float:left;',
          'data-ng-src': "{{currentUser.avatar || 'img/images.png'}}"
        }),
        h('.avatarInfo', {'style': 'display:inline-block; margin-left:10px;'}, [
          h('h4', {'style': 'line-height:0.2;'}, '{{currentUser.firstName}} {{currentUser.lastName}}'),
          h('h5', {'style': 'color:gray'}, '{{currentUser.type}}')
        ]),
        h('div', {'style': 'margin: 0 0 0 1100px'}, [
          h('a', {'data-ui-sref':'dashboard'}, [
            h('img', {'src': 'img/viewAll.svg', 'style': 'display: inline-block;position: fixed;top: 10px;right: 10px;'})
          ])
        ])
      ]),
      h('.infoTab.blueBottom.medGreyTxt', {'style': 'position:absolute;left:30px;bottom:0px;line-height:37px;'}, 'INFO')
    ]),
    h('.fixedContainer', {
      'style': 'overflow:scroll;'
    }, [
      h('.col-md-6.cardGrid', [
        h('.card', {'data-ng-hide': "showThis['generalEdit']"}, [
          h('.cardTitle', 'General'),
          h('i.glyphicon .glyphicon-cog .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['generalEdit'] = true"
          }),
          h('.cardBody', [
            h('.col-md-6', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'FIRST NAME'),
              h('p.bold', '{{currentUser.firstName}}')
            ]),
            h('.col-md-6', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'LAST NAME'),
              h('p.bold', '{{currentUser.lastName}}')
            ]),
            h('.col-md-6', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'CLASS'),
              h('p.bold', '{{currentUser.class}}')
            ]),
            h('.col-md-6', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'ORGANIZATION'),
              h('p.bold', '{{currentUser.organization}}')
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img', {
                'data-ng-src': "{{currentUser.avatar || 'img/images.png'}}",
                'style': 'float:left; width:30px; height:30px; margin: 5px 5px 0px 0px; border-radius:100%;'
              })
            ])
          ])
        ]),
        h('.card', {'data-ng-show': "showThis['generalEdit']"}, [
          h('.cardTitle', 'General'),
          h('.createCheck.fa.fa-check .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['generalEdit'] = false; updateInfo()",
            'data-ng-keypress': 'messageEnterPress($event)'
          }),
          h('.cardBody', [
            h('.col-md-6', [
              h('p.formP', 'First Name'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentUser.firstName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'Last Name'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentUser.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'Class'),
              h('select#sel1.form-control', {
                'data-ng-model': 'currentUser.class',
                'required': ''
              }, [
                h('option', {'data-ng-repeat': 'course in allCourses'}, '{{course.courseName}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'Organization'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'currentUser.organization',
                'required': ''
              })
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img.preview', {
                'data-ngf-src': "currentUser.avatar",
                'style': 'float:left;margin: 5px 5px 0px 0px; border-radius:100%;height:30px;width:30px;'
              }),
              h('input', {
                'id': 'userAvatar',
                'type': 'file',
                'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
                'data-ngf-max-size':'2MB',
                'data-accept': 'image/*'
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6.cardGrid', [
        h('.card', {'data-ng-hide': "showThis['contactEdit']"}, [
          h('.cardTitle', 'Contact'),
          h('i.glyphicon .glyphicon-cog .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['contactEdit'] = true"
          }),
          h('.cardBody', [
            h('.staffOpt2', [
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT PHONE'),
                h('p.bold', '{{currentUser.phone}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT EMAIL'),
                h('p.bold', '{{currentUser.email}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT ADDRESS'),
                h('p.bold', '{{currentUser.address}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'CITY'),
                h('p.bold', '{{currentUser.city}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'STATE'),
                h('p.bold', '{{currentUser.state}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ZIPCODE'),
                h('p.bold', '{{currentUser.zipcode}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION ADDRESS'),
                h('p.bold', '{{currentUser.organizationAddress}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION STATE'),
                h('p.bold', '{{currentUser.organizationState}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION ZIP CODE'),
                h('p.bold', '{{currentUser.organizationZipcode}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION EMAIL'),
                h('p.bold', '{{currentUser.organizationEmail}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION PHONE'),
                h('p.bold', '{{currentUser.organizationPhone}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION FAX'),
                h('p.bold', '{{currentUser.organizationFax}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'ADMINISTRATOR'),
                h('p.bold', '{{currentUser.organizationAdmin}}')
              ])
            ])
          ])
        ]),
        h('.card', {'data-ng-show': "showThis['contactEdit']"}, [
          h('.cardTitle', 'Contact'),
          h('.createCheck.fa.fa-check .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['contactEdit'] = false; updateInfo()",
            'data-ng-keypress': 'messageEnterPress($event)'
          }),
          h('.cardBody', [
            h('.staffEditOpt1', [
              h('.col-md-6', [
                h('p.formP', 'DIRECT PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.phone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.email',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.address',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.city',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT STATE'),
                h('select#sel1.form-control', {
                  'data-ng-model': 'currentUser.state',
                  'required': ''
                }, [
                  h('option', {'data-ng-repeat': 'state in states'}, '{{state}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ZIPCODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.zipcode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationAddress',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationCity',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION STATE'),
                h('select#sel1.form-control', {
                  'data-ng-model': 'currentUser.organizationState',
                  'required': ''
                }, [
                  h('option', {'data-ng-repeat': 'state in states'}, '{{state}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION ZIPCODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationZipcode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationEmail',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationPhone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION FAX'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationFax',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ADMINISTRATOR'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'currentUser.organizationAdmin',
                  'required': ''
                })
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
