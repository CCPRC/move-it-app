var h = require('hyperscript')
var topNav = require('./topNav.js')

module.exports = {
  url: '/questionnaire/:member_id',
  template: render().outerHTML,
  controller: ['$scope', '$state', 'members', 'optionService', 'store', component]
}
function component ($scope, $state, members, optionService, store) {
  $scope.statusOptions = optionService.get('status')
  if(store.get('currentMember')) {
    $scope.currentMember = store.get('currentMember')
  }
  $scope.questionnaire = {
    TBCLevel : {
      known: false,
      level: ''
    },
    diabetes : {
      known: false,
      fastingLevel: ''
    },
    jointProblem : {
      known: false,
      location: ''
    }
  }
  $scope.saveQuestionnaire = function () {
    $scope.currentMember.questionnaire = $scope.questionnaire
    members.update($scope.currentMember).then(function (res) {
      $state.go('info')
    })
  }
}
function render () {
  return h('div', [
    h('membertoolbar'),
    topNav,
    h('.fixedContainer#questionnaire', {
      'style': 'padding-left:30px'
    }, [
      h('.col-md-12', [
        h('h1.darkGreyTxt', 'Questionnaire'),
        h('br'),
        h('p', 'These questions come from the Physical Activity Readiness Questionnaire (PAR-Q) as documented by the American College of Sports Medicine (ACSM), revised in 2002, and are intended for people between the ages of 15 and 69.'),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '1'),
              h('p', 'Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px; '
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'inlineRadioOptions1',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.heartCondition'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'inlineRadioOptions1',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.heartCondition'
                })
              ], 'No')
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '2'),
              h('p', 'Do you feel pain in your chest when you do physical activity?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px;'
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'chestPain',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.chestPain'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'chestPain',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.chestPain'
                })
              ], 'No')
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '3'),
              h('p', 'In the past month, have you had chest pain when you were not doing physical activity?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px; '
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'heartCondition',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.chestPainNotActivityBased'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'heartCondition',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.chestPainNotActivityBased'
                })
              ], 'No')
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '4'),
              h('p', 'Do you lose you balance because of dizziness or do you ever lose consciousness?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px;'
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'balance',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.dizzy'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'balance',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.dizzy'
                })
              ], 'No')
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '5'),
              h('p', 'Do you have a bone or joint problem (for example, back, knee, hip) that could be made worse by a change in your physical activity?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px;'
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'inlineRadioOptions6',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.fragileBoneJoint'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'inlineRadioOptions6',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.fragileBoneJoint'
                })
              ], 'No')
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '6'),
              h('p', 'Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px; '
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'inlineRadioOptions8',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.drPrescriptions'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'inlineRadioOptions8',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.drPrescriptions'
                })
              ], 'No')
            ])
          ])
        ]),
        h('.col-md-6', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '7'),
              h('p', 'Do you know of any other reason why you should not do physical activity?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px; '
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'inlineRadioOptions9',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.otherReasonAgainstActivity'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'inlineRadioOptions9',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.otherReasonAgainstActivity'
                })
              ], 'No')
            ])
          ])
        ]),
      h('br'),
      h('.col-md-12.darkGreyTxt', [
        h('p', 'The following questions are based on the American College of Sports Medicine (ACSM) Pre-Participation Health Screening and Risk Stratification questionnaire.')
      ]),
      h('br'),
      h('div.col-md-12', [
        h('.panel.panel-default', {
          'style': 'height: 350px;'
        }, [
          h('.panel-heading', [
            h('h1.blueTxt', '1'),
            h('p', 'Have you had any of the following?')
          ]),
          h('.panel-body', [
            h('.col-md-4.checkBoxPadding', [
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'heart attack',
                  'data-ng-model': 'questionnaire.heartAttack',
                })
              ], 'Heart Attack'),
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'Implantable Cardiac Defribillator',
                  'data-ng-model': 'questionnaire.defrib',
                })
              ], 'Implantable Cardiac Defribillator'),
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'heart disease',
                  'data-ng-model': 'questionnaire.heartDisease',
                })
              ], 'Heart Disease'),
            ]),
            h('.col-md-4.checkBoxPadding', [
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'heart surgery',
                  'data-ng-model': 'questionnaire.heartSurgery',
                })
              ], 'Heart Surgery'),
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'Implantable Valve Disease',
                  'data-ng-model': 'questionnaire.heartValve',
                })
              ], 'Implantable Valve Disease')
            ]),
            h('.col-md-4.checkBoxPadding', [
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'pacemaker',
                  'data-ng-model': 'questionnaire.pacemaker',
                })
              ], 'Pacemaker'),
              h('label.checkbox', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'Heart Failure',
                  'data-ng-model': 'questionnaire.heartFailure',
                })
              ], 'Heart Failure')
            ]),
            h('.col-md-12', [
              h('p', {'style': 'padding-top:15px;'}, 'Do you have high blood pressure or any other cardiovascular problems or diseases not listed on this medical history?'),
              h('textarea.form-control', {
                'style': 'width: 100%; padding-bottom:10px;',
                'rows': '5',
                'cols': '50',
                'data-ng-model': 'questionnaire.otherNote'
              })
            ])
          ])
        ])
      ]),
      h('br'),
        h('div.col-md-12', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '2'),
              h('p', 'Do you have any of the following symptoms?')
            ]),
            h('.col-md-4', [
              h('label.checkbox-inline', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'chest discomfort',
                  'data-ng-model': 'questionnaire.chestDiscomfort',
                })
              ], 'Chest discomfort with exertion')
            ]),
            h('.col-md-4', [
              h('label.checkbox-inline', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'breathless',
                  'data-ng-model': 'questionnaire.breathless',
                })
              ], 'Unreasonable breathlessness')
            ]),
            h('.col-md-4', [
              h('label.checkbox-inline', [
                h('input', {
                  'type': 'checkbox',
                  'name': 'faint',
                  'data-ng-model': 'questionnaire.faint',
                })
              ], 'Dizziness, fainting or blackouts')
            ])
          ])
        ]),
      h('br'),
        h('.col-md-12', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '3'),
              h('p', 'Do you take any prescription medications for a medical condition or disease including heart disease, high blood pressure or diabetes?')
            ]),
            h('.radio', {
              'style': 'padding-left:40px; '
            }, [
              h('label', [
                h('input#optionsRadios1', {
                  'name': 'medication',
                  'type': 'radio',
                  'data-ng-value': 'true',
                  'data-ng-model': 'questionnaire.medicationForCondition'
                })
              ], 'Yes'),
              h('label', {
                'style': 'margin-left:20px;'
              }, [
                h('input#inlineRadio2', {
                  'name': 'medication',
                  'type': 'radio',
                  'data-ng-value': 'false',
                  'data-ng-model': 'questionnaire.medicationForCondition'
                })
              ], 'No')
            ])
          ])
        ]),
      h('br'),
        h('.col-md-12', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '4'),
              h('p', 'Cardiovascular risk factors')
            ]),
            h('.panel-body#panelCol', [
              h('.col-md-6', [
                h('p', 'Are you a man older than 45 years old?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'man45',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.man45'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'man45',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.man45'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Are you a woman older than 55 years old have had a hysterectomy, or are postmenopausal?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'woman55',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.woman55'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'woman55',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.woman55'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you exercise less than three times per week, or get less than a total of 90 minutes of exercise per week?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'exercise90',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.excersiceDeficient'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'exercise90',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.excersiceDeficient'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you use tobacco(smoke,chew or snuff) or have you quit using tobacco in the past six months?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'tobacco',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.tobacco'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'tobacco',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.tobacco'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you take blood pressure medication?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'bloodPressureMedication',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.bloodPressureMedication'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'bloodPressureMedication',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.bloodPressureMedication'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you know your Total Blood Cholesterol level? If you know it, enter the number here'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'totalBloodCholesterol',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': "questionnaire.TBCLevel['known']"
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'totalBloodCholesterol',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': "questionnaire.TBCLevel['known']"
                    })
                  ], 'No')
                ]),
                h('.hiddenInput', {
                  'data-ng-show': "questionnaire.TBCLevel['known'] === true"
                }, [
                  h('label.formP', 'Total Blood Cholesterol Level'),
                  h('input.form-control', {
                    'id': '',
                    'type': 'number',
                    'min': '0',
                    'data-ng-model': "questionnaire.TBCLevel['number']"
                  })
                ]),
              ]),
              h('.col-md-6', [
                h('p', 'Is your HDL less than 60 mg/dl?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'hdl',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.HDLLess60'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'hdl',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.HDLLess60'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you have a close relative who had a heart attack or heart surgery before age 55 (father or brother) or age 65 (mother or sister)'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'relativeHeart',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.relativeHeart'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'relativeHeart',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.relativeHeart'
                    })
                  ], 'No')
                ])
              ])
            ])
          ])
        ]),
      h('br'),
        h('.col-md-12#panelCol', [
          h('.panel.panel-default', [
            h('.panel-heading', [
              h('h1.blueTxt', '5'),
              h('p', 'Other health issues')
            ]),
            h('.panel-body', [
              h('.col-md-6', [
                h('p', 'Do you have diabetes? If yes, what is your fasting glucose level?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'diabetes',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': "questionnaire.diabetes['known']"
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'diabetes',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': "questionnaire.diabetes['known']"
                    })
                  ], 'No')
                ]),
                h('.hiddenInput', {
                  'data-ng-show': "questionnaire.diabetes['known'] === true"
                }, [
                  h('label.formP', 'Fasting Glucose Level'),
                  h('input.form-control', {
                    'id': '',
                    'type': 'number',
                    'min': '0',
                    'data-ng-model': "questionnaire.diabetes['fastingLevel']"
                  })
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you have asthma or any other lung disease?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'asthma',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.lungDisease'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'asthma',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.lungDisease'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Are you currently being treated for cancer?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'cancer',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.cancer'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'cancer',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.cancer'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Have you had a stroke?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'stroke',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.stroke'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'stroke',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.stroke'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you have a burning or cramping sensation in your legs when walking short distances?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'legCramp',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.shortDistanceIssue'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'legCramp',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.shortDistanceIssue'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you have a bone or joint problem? If so, please list location.'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'boneJoint',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': "questionnaire.jointProblem['known']"
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'boneJoint',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': "questionnaire.jointProblem['known']"
                    })
                  ], 'No')
                ]),
                h('.hiddenInput', {
                  'data-ng-show': "questionnaire.jointProblem['known'] === true"
                }, [
                  h('label.formP', 'location of bone or joint problems'),
                  h('textarea.form-control', {
                    'style': 'width: 100%; padding-bottom:10px;',
                    'rows': '5',
                    'cols': '50',
                    'data-ng-model': "questionnaire.jointProblem['location']"
                  })
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Do you have concerns about the safety of exercise?'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'safetyConcern',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.safetyConcern'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'safetyConcern',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.safetyConcern'
                    })
                  ], 'No')
                ])
              ]),
              h('.col-md-6', [
                h('p', 'Are you pregnant'),
                h('.radio', [
                  h('label', [
                    h('input#optionsRadios1', {
                      'name': 'pregnant',
                      'type': 'radio',
                      'data-ng-value': 'true',
                      'data-ng-model': 'questionnaire.pregnant'
                    })
                  ], 'Yes'),
                  h('label', {
                    'style': 'margin-left:20px;'
                  }, [
                    h('input#inlineRadio2', {
                      'name': 'pregnant',
                      'type': 'radio',
                      'data-ng-value': 'false',
                      'data-ng-model': 'questionnaire.pregnant'
                    })
                  ], 'No')
                ])
              ])
            ])
          ])
        ]),
        h('br'),
        h('.right', {
          'style':'margin-right:20px;margin-top:20px;'
        },[
          h('btn.btn-lg.btn-default.inline', {
            'style': 'position:middle;margin-right:15px;',
            'data-ui-sref': 'info'
          }, 'Back'),
          h('btn.btn-lg.btn-primary', {
            'style': 'position:middle;',
            'data-ng-click': 'saveQuestionnaire()'
          }, 'SAVE')
        ])
      ])
    ])
  ])
}
