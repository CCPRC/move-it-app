'use strict'

module.exports = {
  title: 'Stats',
  description: 'The data on participants physical output',
  type: 'object',
  required: ['_id', 'type', 'parent_id'],
  properties: {
    _id: {
      id: '_id',
      type: 'string'
    },
    rev: {
      id: '_rev',
      type: 'string'
    },
    type: {
      id: 'type',
      type: 'string',
      pattern: 'stats'
    },
    parent_id: {
      id: 'parent_id',
      type: 'string'
    },
    date: {
      id: 'date',
      type: 'string'
    },
    bmi: {
      id: 'bmi',
      type: 'string'
    },
    weight: {
      id: 'weight',
      type: 'string'
    },
    height: {
      id: 'height',
      type: 'string'
    },
    calsburned: {
      id: 'calsburned',
      type: 'string'
    },
    heartrate: {
      id: 'heartrate',
      type: 'string'
    }
  }
}