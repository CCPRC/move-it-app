var h = require('hyperscript')

module.exports = function () {
  return h('div.modal-content', [
    h('div.modal-header', [
      h('h4#myModalLabel.modal-title', 'Add Devices')
    ]),
    h('form', [
      h('.col-md-6.courseInfo', [
        h('p.formP', 'DEVICE 1'),
        h('input.form-control', {
          'type': 'text',
          'data-ng-model': 'device1.credentials'
        })
      ])
    ]),
    h('.modal-footer', [
      h('.col-md-8', {
        'style': 'margin: 35px 0px 0px 0px'
      }, [
        h('.lincBtn', {
          'type': 'button',
          'data-ng-click': 'addNewDevice()',
          'style': 'float: left;'
        }, 'Add')
      ])
    ])
  ])
}
