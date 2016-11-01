var h = require('hyperscript')

module.exports = function () {
  return h('.topToolBar', [
    h('.topTools', {
      'style': 'top:10px;'
    }, [
      // // h('button.btn', {
      // //   'style': 'text-align:center;border:1px solid lightgrey; margin-bottom:26px; margin-right:6px;background-color:white;'
      // // }, [
      // //   h('div', {
      // //     'data-ui-sref': 'newMember'
      // //   }, [
      // //     h('img', {'src': 'img/add.png'})
      // //   ])
      // // ]),
      // h('div', {
      //   'style': 'display:inline-block;'
      // }, [
      //   // h('.input-group', {
      //   //   'style': 'width:120px;'
      //   // }, [
      //   //   h('span.input-group-addon', [
      //   //     h('img', {'src': 'img/search.svg'})
      //   //   ]),
      //   //   h('input.form-control', {
      //   //     'type': 'text',
      //   //     'style': 'width:120px;',
      //   //     'data-ng-model': 'searchText',
      //   //     'placeholder': 'Search'
      //   //   })
      //   // ])
      // ])
    ])
  ])
}
