'use strict'

module.exports = {
  title: 'Assessments',
  description: 'A class which can be attended by members.',
  type: 'object',
  required: ['_id', 'type', 'activity', 'date', 'result', 'parent_id'],
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
      pattern: 'assessments'
    },
    activity: {
      id: 'activity',
      type: 'string'
    },
    result: {
      id: 'result',
      type: 'string'
    },
    parent_id: {
      id: 'parent_id',
      type: 'string'
    }
  }
}