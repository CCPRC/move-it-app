'use strict'
var h = require('hyperscript')

module.exports = function (dateCat) {
  return h('div.lincModal .hide', {
    'style': 'padding:30px;background-color:white;border:1px solid black;position:absolute;top: 0;left: 0;width: 100%;height: 100%;',
    'id': dateCat + 'Modal'
  }, [
    h('h3', {'style': 'text-align:center;margin-bottom:30px;'}, 'member ' + dateCat + ' date'),
    h('.flexjustify', [
      h('div.inline.greyBtn', {
        'data-uib-dropdown': '',
        'data-on-toggle': 'toggled(open)',
        'data-uib-dropdown-toggle': ''
      }, [
        h('a#month-dropdown', {
          'data-uib-dropdown-toggle': ''
        }, [
          h('div', 'month'),
          h('div', '{{setMonth}}')
        ]),
        h('ul', {
          'data-uib-dropdown-menu': '',
          'data-aria-labelledby': 'month-dropdown',
          'style': 'height: 200px;overflow: scroll;'
        }, [
          h('li', {
            'data-ng-repeat': 'month in months',
            'data-ng-click': 'setThisMonth(month)'
          }, [
            h('a', {
              'data-ng-click': 'setThisMonth(month)'
            }, '{{month}}')
          ])
        ])
      ]),
      h('div.inline.greyBtn', {
        'data-uib-dropdown': '',
        'data-on-toggle': 'toggled(open)',
        'data-uib-dropdown-toggle': ''
      }, [
        h('a#day-dropdown', {
          'data-uib-dropdown-toggle': ''
        }, [
          h('div', 'day'),
          h('div', '{{setDay}}')
        ]),
        h('ul', {
          'data-uib-dropdown-menu': '',
          'data-aria-labelledby': 'day-dropdown',
          'style': 'height: 200px;overflow: scroll;'
        }, [
          h('li', {
            'data-ng-repeat': 'day in days'
          }, [
            h('a', {
              'data-ng-click': 'setThisDay(day)'
            }, '{{day}}')
          ])
        ])
      ]),
      h('div.inline.greyBtn', {
        'data-uib-dropdown': '',
        'data-uib-dropdown-toggle': '',
        'data-on-toggle': 'toggled(open)'
      }, [
        h('a#year-dropdown', {
          'data-uib-dropdown-toggle': ''
        }, [
          h('div', 'year'),
          h('div', '{{setYear}}')
        ]),
        h('ul', {
          'data-uib-dropdown-menu': '',
          'data-aria-labelledby': 'year-dropdown',
          'style': 'height: 200px;overflow: scroll;'
        }, [
          h('li', {
            'data-ng-repeat': 'year in years.slice().reverse()'
          }, [
            h('a', {
              'data-ng-click': 'setThisYear(year)'
            }, '{{year}}')
          ])
        ])
      ])
    ]),
    h('.lincBtn', {
      'style': 'display:block;position:absolute;bottom:10px;right:20px;',
      'data-ng-click': 'save' + dateCat + 'Date(); $event.stopPropagation()'
    }, 'save')
  ])
}
