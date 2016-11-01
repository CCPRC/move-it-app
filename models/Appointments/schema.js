'use strict'

module.exports = {
  title: 'Appointments',
  description: 'A class which can be attended by members.',
  type: 'object',
  required: ['_id', 'type', 'courseName', 'courseCode'],
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
      pattern: 'appointments'
    },
    courseParent: {
      id: 'courseParent',
      type: 'string'
    },
    year: {
      id: 'year',
      type: 'integer'
    },
    month: {
      id: 'month',
      type: 'integer'
    },
    day: {
      id: 'day',
      type: 'integer'
    },
    time: {
      id: 'time',
      type: 'integer'
    }
  }
}