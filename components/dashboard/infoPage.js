var h = require('hyperscript')

module.exports = {
  url: '/participantInfo',
  template: render().outerHTML,
  controller: ['$scope', 'users', 'stats', 'store', '$stateParams', 'courses', 'optionService', component]
}

function component ($scope, users, stats, store, $stateParams, courses, optionService) {
  $scope.user = store.get('currentNavigator')
  $scope.profileScreen = 'show'
  $scope.participant = store.get('currentParticipant')
  $scope.staffType = $scope.participant.classification
  $scope.states = optionService.get('states')
  $scope.showThis = {
    generalEdit: false,
    contactEdit: false
  }
  // $scope.init = function () {
  //   $scope.status = true
  // }
  // $scope.changeStatus = function () {
  //   $scope.status = !$scope.status
  // }
  // $scope.updateInfo = function () {
  // }
  courses.list().then(function (allCourses) {
    $scope.allCourses = allCourses
  })
  $scope.uploadFiles = function(file, errFiles) {
    $scope.file = file
    $scope.errFile = errFiles && errFiles[0]
  }
  $scope.messageEnterPress = function (event) {
   if (!event.shiftKey && event.keyCode === 13) {
     event.preventDefault()
     $scope.updateInfo()
   }
 }
}

function render () {
  return h('div', [
    h('membertoolbar', {
      'data-currentpage': 'people'
    }),
    h('nav.navbar.navbar-default.fixedHeader', {
      'style': 'height:120px;'
    }, [
      h('div', {
        'style': 'margin-left:30px;margin-top:10px;'
      }, [
        h('img.avatarCircle', {
          'style': 'display:inline-block;width:50px;height:50px;border-radius:100%;',
          'data-ng-src': "{{participant.avatar || 'img/images.png'}}"
        }),
        h('.avatarInfo', {
          'style': 'display:inline-block; margin-left:20px;'
        }, [
          h('h4', {
            'style': 'line-height:0.2;'
          }, '{{participant.firstName}} {{participant.lastName}}'),
          h('h5', {
            'style': 'color:gray'
          }, '{{participant.classification}}')
        ]),
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
    h('.fixedContainer', {
      'style': 'overflow:scroll;'
    }, [
      h('.col-md-6', [
        h('.panel.panel-default', {
          'data-ng-hide': "showThis['generalEdit']"
        }, [
          h('.panel-heading', 'General'),
          h('i.glyphicon .glyphicon-cog .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['generalEdit'] = true"
          }),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP.infoP', {
                'style': 'color:lightgrey;'
              }, 'FIRST NAME'),
              h('p.bold', '{{participant.firstName}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', {
                'style': 'color:lightgrey;'
              }, 'LAST NAME'),
              h('p.bold', '{{participant.lastName}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', {
                'style': 'color:lightgrey;'
              }, 'CLASS'),
              h('p.bold', '{{participant.class}}')
            ]),
            h('.col-md-6', [
              h('p.formP.infoP', {
                'style': 'color:lightgrey;'
              }, 'ORGANIZATION'),
              h('p.bold', '{{participant.organization}}')
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img', {
                'data-ng-src': "{{participant.avatar || 'img/images.png'}}",
                'style': 'float:left; height:60px;width:60px; margin: 5px 5px 0px 0px; border-radius:100%;'
              }),
            ])
          ])
        ]),
        h('.panel.panel-default', {
          'data-ng-show': "showThis['generalEdit']",
          'data-ng-keypress': 'messageEnterPress($event)'
        }, [
          h('.panel-heading', 'General'),
          h('.createCheck.fa.fa-check .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['generalEdit'] = false; updateInfo()"
          }),
          h('.panel-body', [
            h('.col-md-6', [
              h('p.formP', 'First Name'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'participant.firstName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'Last Name'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'participant.lastName',
                'required': ''
              })
            ]),
            h('.col-md-6', [
              h('p.formP', 'Class'),
              h('select#sel1.form-control', {
                'data-ng-model': 'participant.class',
                'required': ''
              }, [
                h('option', {
                  'data-ng-repeat': 'course in allCourses'
                }, '{{course.courseName}}')
              ])
            ]),
            h('.col-md-6', [
              h('p.formP', 'Organization'),
              h('input.form-control', {
                'type': 'text',
                'data-ng-model': 'participant.organization',
                'required': ''
              })
            ]),
            h('.col-md-12', [
              h('p.formP', {
                'style': 'color:lightgrey;'
              }, 'PHOTO'),
              h('img.preview', {
                'data-ngf-src': "participant.avatar",
                'style': 'float:left;margin: 5px 5px 0px 0px; border-radius:100%;height:30px;width:30px;'
              }),
              h('input', {
                'id': 'userAvatar',
                'type': 'file',
                'data-ngf-select': 'uploadFiles($file, $invalidFiles)',
                'data-ngf-max-size':'2MB',
                'data-accept': 'image/*',
                'data-ng-model': 'participant.avatar'
              })
            ])
          ])
        ])
      ]),
      h('.col-md-6', [
        h('.panel.panel-default', {
          'data-ng-hide': "showThis['contactEdit']"
        }, [
          h('.panel-heading', 'Contact'),
          h('i.glyphicon .glyphicon-cog .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['contactEdit'] = true"
          }),
          h('.panel-body', [
            h('.staffOpt1', {
              'data-ng-if': "staffType === 'physician' || staffType === 'trainer'"
            }, [
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT PHONE'),
                h('p.bold', '{{physician.directPhone}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT EMAIL'),
                h('p.bold', '{{physician.directEmail}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'OFFICE ADDRESS'),
                h('p.bold', '{{physician.officeAddress}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'CITY'),
                h('p.bold', '{{physician.city}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'STATE'),
                h('p.bold', '{{physician.state}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ZIPCODE'),
                h('p.bold', '{{physician.zipcode}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'OFFICE EMAIL'),
                h('p.bold', '{{physician.officeEmail}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'OFFICE PHONE'),
                h('p.bold', '{{physician.officePhone}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'OFFICE FAX'),
                h('p.bold', '{{physician.officeFax}}')
              ])
            ]),
            h('.staffOpt2', {
              'data-ng-if': "staffType === 'user'"
            }, [
              h('div.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT PHONE'),
                h('p.bold', '{{participant.directPhone}}')
              ]),
              h('.col-md-6', [
                h('p.formP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT EMAIL'),
                h('p.bold', '{{participant.directEmail}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'DIRECT ADDRESS'),
                h('p.bold', '{{participant.directAddress}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'CITY'),
                h('p.bold', '{{participant.directCity}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'STATE'),
                h('p.bold', '{{participant.directState}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'CITY'),
                h('p.bold', '{{participant.organizationCity}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ZIPCODE'),
                h('p.bold', '{{participant.directZipcode}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION ADDRESS'),
                h('p.bold', '{{participant.organizationAddress}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION STATE'),
                h('p.bold', '{{participant.organizationState}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ZIP CODE'),
                h('p.bold', '{{participant.organizationZipcode}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION EMAIL'),
                h('p.bold', '{{participant.organizationEmail}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION PHONE'),
                h('p.bold', '{{participant.organizationPhone}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ORGANIZATION FAX'),
                h('p.bold', '{{participant.organizationFax}}')
              ]),
              h('.col-md-6', [
                h('p.formP.infoP', {
                  'style': 'color:lightgrey;'
                }, 'ADMINISTRATOR'),
                h('p.bold', '{{participant.organizationAdmin}}')
              ])
            ])
          ])
        ]),
        h('.panel.panel-default', {
          'data-ng-show': "showThis['contactEdit']",
          'data-ng-keypress': 'messageEnterPress($event)'
        }, [
          h('.panel-heading', 'Contact'),
          h('.createCheck.fa.fa-check .editCog', {
            'style': 'color:lightgrey;display:inline-block;float:right;line-height:normal;font-size:1.5em;cursor:pointer;',
            'data-ng-click': "showThis['contactEdit'] = false; updateInfo()"
          }),
          h('.panel-body', [
            h('.staffEditOpt1', {
              'data-ng-if': "staffType === 'user'"
            }, [
              h('.col-md-6', [
                h('p.formP', 'DIRECT PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directPhone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directEmail',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directAddress',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directCity',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT STATE'),
                h('select#sel1.form-control', {
                  'data-ng-model': 'participant.directState',
                  'required': ''
                }, [
                  h('option', {
                    'data-ng-repeat': 'state in states'
                  }, '{{state}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ZIPCODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directZipcode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.organizationAddress',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.organizationCity',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION STATE'),
                h('select#sel1.form-control', {
                  'data-ng-model': 'participant.organizationState',
                  'required': ''
                }, [
                  h('option', {
                    'data-ng-repeat': 'state in states'
                  }, '{{state}}')
                ])
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION ZIPCODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.organizationZipcode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.organizationEmail',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'member.organizationPhone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ORGANIZATION FAX'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'member.organizationFax',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'ADMINISTRATOR'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'member.organizationAdmin',
                  'required': ''
                })
              ])
            ]),
            h('.staffEditOpt2', {
              'data-ng-if': "staffType === 'physician' || staffType === 'trainer'"
            }, [
              h('.col-md-6', [
                h('p.formP', 'DIRECT PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directPhone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directEmail',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directAddress',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directCity',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT STATE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directState',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'DIRECT ZIPCODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.directZipcode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE MANAGER NAME'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeManagerName',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE ADDRESS'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeAddress',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE CITY'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeCity',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE STATE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeState',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE ZIPCODE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeZipcode',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE EMAIL'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeEmail',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE PHONE'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officePhone',
                  'required': ''
                })
              ]),
              h('.col-md-6', [
                h('p.formP', 'OFFICE FAX'),
                h('input.form-control', {
                  'type': 'text',
                  'data-ng-model': 'participant.officeFax',
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
